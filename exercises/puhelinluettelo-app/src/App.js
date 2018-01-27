import React from 'react'
import personService from './services/persons'

import FilterByName from './components/FilterByName'
import NewPersonForm from './components/NewPersonForm'
import PersonTable from './components/PersonTable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      searchField: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const existingPerson = this.state.persons.find(person => person.name === this.state.newName)
    if (existingPerson) {
      if(window.confirm(`${existingPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const modifiedPerson = { ...existingPerson, number: this.state.newNumber}

        personService
          .update(existingPerson.id, modifiedPerson)
          .then(modifiedPerson => {
            const persons = this.state.persons
              .filter(p => p.id !== existingPerson.id)
              .concat(modifiedPerson)
              .sort((p1, p2) => p1.id > p2.id)
            this.setState({
              persons,
              newName: '',
              newNumber: ''  
            })
          })
      } 
    } else {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
    
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: ''
          })
        })
    }
  }

  handleNameChange = (event) => this.setState({ newName: event.target.value })
  handleNumberChange = (event) => this.setState({ newNumber: event.target.value })
  handleSearchFieldChange = (event) => this.setState({ searchField: event.target.value })

  handlePersonRemoval = (id) => () => {
    if(window.confirm(`poistetaanko ${this.state.persons.find(p => p.id === id).name}`)) {
      personService
        .remove(id)
        .then((response) => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== id)
          })
        })
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  render() {
    const personsToShow =
      this.state.searchField ?
        this.state.persons.filter(person => person.name.toUpperCase().includes(this.state.searchField.toUpperCase())) :
        this.state.persons

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <FilterByName
          searchField={this.state.searchField}
          handleSearchFieldChange={this.handleSearchFieldChange}
        />

        <h2>Lisää uusi</h2>
        <NewPersonForm 
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          addPerson={this.addPerson}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
        />

        <h2>Numerot</h2>
        <PersonTable
          persons={personsToShow}
          handlePersonRemoval={this.handlePersonRemoval}
        />
      </div>
    )
  }
}

export default App