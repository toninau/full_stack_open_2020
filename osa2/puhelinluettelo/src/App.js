import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    style: null
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        showNotification('Could not retrieve persons', 'error')
      })
  }, [])

  const showNotification = (message, style) => {
    setNotification({ message: message, style: style })
    setTimeout(() => {
      setNotification({ message: null, style: null })
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    const changedPerson = { ...person, number: newNumber }
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            showNotification(`Changed number of ${returnedPerson.name} to ${returnedPerson.number}`, 'success')
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
          .catch(error => {
            showNotification(`Information of ${person.name} has already been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== person.id))
          })
        setNewName('')
        setNewNumber('')
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          showNotification(`Added ${returnedPerson.name}`, 'success')
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          showNotification(`Could not add ${personObject.name}`, 'error')
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deleteId(id)
        .then(response => {
          showNotification(`Deleted ${person.name}`, 'success')
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          showNotification(`Information of ${person.name} has already been removed from server`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons persons={persons} filterValue={newFilter} handleDeletePerson={deletePerson} />
    </div>
  )
}

export default App