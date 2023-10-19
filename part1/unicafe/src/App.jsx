import { useState } from 'react'



const Display = ({value}) => {
  return (
      <div>
        <h1>{value}</h1>
      </div>
  )
}

const Button = (props) => {
  return (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
      <div>{text} {value}</div>
  )
}

const Statistics = (props) => {
  const statisticsName = 'statistics'
  const allText = 'all'
  const averageText = 'average'
  const positiveText = 'positive'
  const goodText = 'good'
  const neutralText = 'neutral'
  const badText = 'bad'

  const average = () => {
    return (
        props.all / 3
    )
  }

  const positive = () => {
    return (
        props.good * 100 / props.all + '%'
    )
  }

  if (props.all !== 0) {
    return (
        <div>
          <Display value={statisticsName}/>
          <StatisticLine text={goodText} value={props.good}/>
          <StatisticLine text={neutralText} value={props.neutral}/>
          <StatisticLine text={badText} value={props.bad}/>
          <StatisticLine text={allText} value={props.all}/>
          <StatisticLine text={averageText} value={average()}/>
          <StatisticLine text={positiveText} value={positive()}/>
        </div>
    )
  }
  return (
    <div><p>No feedback given</p></div>
)
}


const App = () => {
  const formName = 'give feedback'
  const goodText = 'good'
  const neutralText = 'neutral'
  const badText = 'bad'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
    <Display value={formName}/>
        <Button text={goodText} handleClick={() => {
          setGood(good + 1)
          setAll(all + 1)
        }}/>
        <Button text={neutralText} handleClick={() => {
          setNeutral(neutral + 1)
          setAll(all + 1)
        }}/>
        <Button text={badText} handleClick={() => {
          setBad(bad + 1)
          setAll(all + 1)
        }}/>
        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App