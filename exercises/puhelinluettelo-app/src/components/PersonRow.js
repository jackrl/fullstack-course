import React from 'react'

const PersonRow = ({ person, handlePersonRemoval }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handlePersonRemoval(person.id)}>poista</button></td>
    </tr>
  )
}

export default PersonRow