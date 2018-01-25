import React from 'react'
import PersonRow from './PersonRow'

const PersonTable = ({ persons }) => {
  return (
    <table>
      <tbody>
        {persons.map(person => <PersonRow key={person.name} person={person}/>)}
      </tbody>
    </table>
  )
}

export default PersonTable
