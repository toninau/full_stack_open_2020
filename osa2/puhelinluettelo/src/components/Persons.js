import React from 'react'
import Person from './Person'

const Persons = ({ persons, filterValue }) => {
  const personsToShow = !filterValue
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <ul>
      {personsToShow.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </ul>
  )
}

export default Persons