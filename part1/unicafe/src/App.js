import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0,
  })

  const handleGoodClick = () => {
  setClicks({ ...clicks, good: clicks.good + 1 })
  console.log("clicks", clicks)
  }

  const handleNeutralClick = () => {
  setClicks({ ...clicks, neutral: clicks.neutral + 1 })
  console.log("clicks", clicks)
  }

  const handleBadClick = () => {
  setClicks({ ...clicks, bad: clicks.bad + 1 })
  console.log("clicks", clicks)
  }

  let all = (clicks.good + clicks.neutral + clicks.bad)
  let average = ((clicks.good - clicks.bad) / all)
  let positive = ((clicks.good / all) * 100)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h2>statistics</h2>
      <div>good {clicks.good}</div>
      <div>neutral {clicks.neutral}</div>
      <div>bad {clicks.bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </div>
  )
}

export default App