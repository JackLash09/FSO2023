import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  
  const good = (props.clicks.good)
  const neutral = (props.clicks.neutral)
  const bad = (props.clicks.bad)
  const all = (good + neutral + bad)
  const average = ((good - bad) / all)
  const positive = ((good / all) * 100)

  return(
  <div>
  <h2>statistics</h2>
  <p> good {good} </p>
  <p> neutral {neutral} </p>
  <p> bad {bad} </p>
  <p>all {all}</p>
  <p>average {average}</p>
  <p>positive {positive}</p>
  </div>
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
      <Statistics clicks={clicks}/>
    </div>
  )
}

export default App