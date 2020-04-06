import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('fail')
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    //const names = persons.map(person => person.name)
    //if (names.indexOf(newName) !== -1) {
    //if (persons.filter(person => person.name === newName).length > 0) {
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('fail')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} handleOnChange={(event) => setNewFilter(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        handleOnSubmit={addPerson}
        nameValue={newName}
        handleOnChangeName={(event) => setNewName(event.target.value)}
        numberValue={newNumber}
        handleOnChangeNumber={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={newFilter} />
    </div>
  )
}

export default App