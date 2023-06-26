import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return(
      <tr>
      <td>{props.text}</td>
      <td>{props.value}%</td>
    </tr>
    )
  }
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  const good = (props.clicks.good)
  const neutral = (props.clicks.neutral)
  const bad = (props.clicks.bad)
  const all = (good + neutral + bad)
  const average = ((good - bad) / all)
  const positive = ((good / all) * 100)

  if (good === 0 && neutral === 0 && bad === 0 ){
    return(
    <div>No feedback given</div>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0,
  })

  const handleGoodClick = () => {
  setClicks({ ...clicks, good: clicks.good + 1 })
  }

  const handleNeutralClick = () => {
  setClicks({ ...clicks, neutral: clicks.neutral + 1 })
  }

  const handleBadClick = () => {
  setClicks({ ...clicks, bad: clicks.bad + 1 })
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h2>statistics</h2>
      <Statistics clicks={clicks}/>
    </div>
  )
}

export default App