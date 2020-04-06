import React from 'react'
import Person from './Person'

const Persons = ({ persons, filterValue, handleDeletePerson }) => {
  const personsToShow = !filterValue
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <ul>
      {personsToShow.map(person =>
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            handleClick={() => handleDeletePerson(person.id)}
          />
      )}
    </ul>
  )
}

export default Persons