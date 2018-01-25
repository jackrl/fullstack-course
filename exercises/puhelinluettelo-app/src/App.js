import React from 'react';
import FilterByName from './components/FilterByName'
import NewPersonForm from './components/NewPersonForm'
import PersonTable from './components/PersonTable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      searchField: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.state.persons.find(person => person.name === this.state.newName)) {
      alert("Duplicate name!")
      this.setState({
        newName: '',
        newNumber: ''  
      })
    } else {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
    
      const persons = this.state.persons.concat(personObject)
    
      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    }
  }

  handleNameChange = (event) => this.setState({ newName: event.target.value })
  handleNumberChange = (event) => this.setState({ newNumber: event.target.value })
  handleSearchFieldChange = (event) => this.setState({ searchField: event.target.value })

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
        <PersonTable persons={personsToShow}/>
      </div>
    )
  }
}

export default App