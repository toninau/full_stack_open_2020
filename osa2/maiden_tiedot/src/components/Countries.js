import React from 'react'
import Country from './Country'

const Countries = ({ countries, filterValue }) => {
  const countriesToShow = !filterValue
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(filterValue.toLowerCase()))

  if (countriesToShow.length === 1) {
    return (
      <div>
        <Country
          countryName={countriesToShow[0].name}
          capital={countriesToShow[0].capital}
          population={countriesToShow[0].population}
          languages={countriesToShow[0].languages}
          flag={countriesToShow[0].flag}
        />
      </div>
    )
  } else if (countriesToShow.length <= 10) {
    return (
      <div>
        <ul>
          {countriesToShow.map(country =>
            <li key={country.name}>
              {country.name}
            </li>
          )}
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

export default Countries