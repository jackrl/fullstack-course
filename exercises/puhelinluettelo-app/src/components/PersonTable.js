import React from 'react'
import PersonRow from './PersonRow'

const PersonTable = ({ persons, handlePersonRemoval }) => {
  return (
    <table>
      <tbody>
        {persons.map(person =>
          <PersonRow
            key={person.id}
            person={person}
            handlePersonRemoval={handlePersonRemoval}
          />)}
      </tbody>
    </table>
  )
}

export default PersonTable
