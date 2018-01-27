import React from 'react'

const Country = ({ country }) => {
  const flagImageAltText = `flag of ${country.name}`

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt={flagImageAltText}/>
    </div>
  )
}

export default Country