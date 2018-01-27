import React from 'react'

import Country from './Country'

const Countries = ({ countriesToShow, handleCountrySelection }) => {
  if(countriesToShow.length > 10) {
    return <div>too many matches, specify another filter</div>
  } else if(countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country => <div key={country.alpha2Code} onClick={handleCountrySelection(country.name)}>{country.name}</div>)}
      </div>
    )
  } else if(countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]}/>
  } else {
    return <div>no matches, specify another filter</div>
  }

}

export default Countries