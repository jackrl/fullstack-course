import React from 'react'

const FilterByName = ({ searchField, handleSearchFieldChange }) => {
  return(
    <div>
      rajaa näytettäviä
      <input 
        value={searchField}
        onChange={handleSearchFieldChange}
      />
    </div>
  )
}

export default FilterByName