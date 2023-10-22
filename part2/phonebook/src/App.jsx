import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm.jsx'
import Persons from './Persons'
import { useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response.data)
    }
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const checkPersonPresence = () => {
    return persons.some((person) => person.name === newName)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if(checkPersonPresence()){
      return window.alert(`${newName} is already added to phonebook`)
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addNewPerson={addNewPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App