import React from 'react'

const Person = ({ name, number, handleClick }) => {
  return (
    <li>
      {name} {number}
      <button onClick={handleClick}>delete</button>
    </li>
  )
}

export default Person