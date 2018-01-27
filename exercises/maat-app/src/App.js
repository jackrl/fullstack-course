import React from 'react'
import axios from 'axios'

import Countries from './components/Countries'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({
          countries: response.data,
          countriesToShow: response.data
         })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleCountrySelection = (countryName) => () => {
    this.setState({ filter: countryName })
  }

  render() {
    const countriesToShow =
        this.state.countries.filter(country => {
          return country.name.toUpperCase().includes(this.state.filter.toUpperCase())
        })
    
    return (
      <div>
        <div>find countries:
          <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>
        <Countries
          countriesToShow={countriesToShow}
          handleCountrySelection={this.handleCountrySelection}
        />
      </div>
    )
  }
}

export default App
