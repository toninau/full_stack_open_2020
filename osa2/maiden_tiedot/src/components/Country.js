import React from 'react'

const Country = ({ countryName, capital, population, languages, flag }) => {
  return (
    <div>
      <h1>{countryName}</h1>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
      <h3>languages</h3>
      <ul>
        {languages.map(language =>
          <li key={language.name}>
            {language.name}
          </li>
        )}
      </ul>
      <img src={flag} alt="flag" height="100"/>
    </div>
  )
}

export default Country