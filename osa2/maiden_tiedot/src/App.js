import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <Filter filterValue={newFilter} handleOnChange={(event) => setNewFilter(event.target.value)} />
      <Countries countries={countries} filterValue={newFilter} />
    </div>
  )
} 

export default App;
