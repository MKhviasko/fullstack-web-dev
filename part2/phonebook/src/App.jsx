import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons'
import { useEffect } from 'react'
import personService from './services/persons'
import RemovePersonForm from './components/RemovePersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    personService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [removePersonName, setRemovePersonName] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handlePersonNameChange = (event) => {
    setRemovePersonName(event.target.value)
  }

  const findPersonByName = () => {
    return persons.find((person) => person.name === newName)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const foundPerson = findPersonByName()
    if(foundPerson == null){
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    } else if (foundPerson.number != newNumber && confirm(`${foundPerson.name} is already added to the phoneook, replace the old number with a new one?`)){
      const updatePerson = {
        name: foundPerson.name,
        number: newNumber
      }
      personService.update(foundPerson.id, updatePerson)
      .then(response => {
        setPersons(persons.concat(response.data).filter(person => person != foundPerson))
        setNewName('')
        setNewNumber('')
      })
    } else if(foundPerson.number == newNumber){
      return window.alert(`${newName} is already added to phonebook`)
    }
  }

  const removePersonHandler = (event) => {
    event.preventDefault()
    const personToRemove = persons.find(person => removePersonName.toLowerCase() === person.name.toLowerCase())
    if((personToRemove != null) && confirm(`Delete ${personToRemove.name}?`)){
    personService.remove(personToRemove.id)
    .then(() => {
      setPersons(persons.filter(person => person.id != personToRemove.id))
      setRemovePersonName('')
    })
  }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addNewPerson={addNewPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>remove person</h3>
      <RemovePersonForm removePersonHandler={removePersonHandler} personName={removePersonName} handlePersonNameChange={handlePersonNameChange}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App