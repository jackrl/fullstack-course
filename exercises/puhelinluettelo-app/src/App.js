import React from 'react'
import personService from './services/persons'

import FilterByName from './components/FilterByName'
import NewPersonForm from './components/NewPersonForm'
import PersonTable from './components/PersonTable'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      searchField: '',
      notificationType: '',
      notificationMessage: null
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
              newNumber: '',
              notificationType: 'success',
              notificationMessage: `muutettiin numero ${modifiedPerson.name}` 
            })
            setTimeout(() => {
              this.setState({
                notificationType: '',
                notificationMessage: null
              })
            }, 5000)
          })
          .catch(error => {
            this.setState({
              persons: this.state.persons.filter(p => p.id !== existingPerson.id),
              notificationType: 'error',
              notificationMessage: `${existingPerson.name} ei ole enää tietokannassa, joten sitä ei voitu muuttaa! Paina 'lisää' jos haluat lisätä sen uudestaan` 
            })
            setTimeout(() => {
              this.setState({
                notificationType: '',
                notificationMessage: null
              })
            }, 5000)
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
            newNumber: '',
            notificationType: 'success',
            notificationMessage: `lisättiin ${newPerson.name}`
          })
          setTimeout(() => {
            this.setState({
              notificationType: '',
              notificationMessage: null
            })
          }, 5000)
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
            persons: this.state.persons.filter(p => p.id !== id),
            notificationType: 'success',
            notificationMessage: `poistettiin ${this.state.persons.find(p => p.id === id).name}`
          })
        })
        setTimeout(() => {
          this.setState({
            notificationType: '',
            notificationMessage: null
          })
        }, 5000)
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

        <Notification 
          type={this.state.notificationType}
          message={this.state.notificationMessage}
        />

        <FilterByName
          searchField={this.state.searchField}
          handleSearchFieldChange={this.handleSearchFieldChange}
        />

        <h2>Lisää uusi / muuta olemassaolevan numeroa</h2>
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