import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = () => {
    if (all > 0) {
      return (good - bad) / all
    }
    return 0
  }
  const positive = () => {
    if (all > 0) {
      return (good / all) * 100
    }
    return 0
  }

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average()}</p>
      <p>Positive: {positive()} %</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => setGood(good + 1)}
        text='Good'
      />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text='Neutral'
      />
      <Button
        handleClick={() => setBad(bad + 1)}
        text='Bad'
      />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)