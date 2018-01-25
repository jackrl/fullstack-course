import React from 'react'

const NewPersonForm = (props) => {
  console.log(props);  
  const {
    newName,
    newNumber,
    addPerson,
    handleNameChange,
    handleNumberChange
  } = props

  return(
    <form onSubmit={addPerson}>
      <div>
        nimi:
        <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        numero:
        <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default NewPersonForm