import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  handleFeedback = (type) => () => this.setState({ [type]: this.state[type] + 1 })

  calculateAverage = () => {
    const {hyva, neutraali, huono} = this.state
    let average = (hyva - huono) / (hyva + neutraali + huono)
    if(!average) return 0
    return average.toFixed(1)
  }

  calculatePositivesPercentage = () => {
    const {hyva, neutraali, huono} = this.state
    let positives = hyva / (hyva + neutraali + huono) * 100
    if(!positives) return '0 %'
    return positives.toFixed(1) + ' %'
  }

  render() {
    const Button = (props) => {
      const {text, handleClick} = props
      return (
        <button onClick={handleClick}>{text}</button>
      )
    }

    const Statistic = (props) => {
      const {text, stat} = props
      return (
        <tr>
          <td>{text}</td>
          <td>{stat}</td>
        </tr>
      )
    }

    const Statistics = (props) => {
      const {hyva, neutraali, huono} = props
      if(!hyva && !neutraali && !huono) return (<div>ei yhtään palautetta annettu</div>)
      return (
        <table>
          <tbody>
            <Statistic text="hyvä" stat={hyva} />
            <Statistic text="neutraali" stat={neutraali} />
            <Statistic text="huono" stat={huono} />
            <Statistic text="keskiarvo" stat={this.calculateAverage()} />
            <Statistic text="positiivisia" stat={this.calculatePositivesPercentage()} />
          </tbody>
        </table>
      )
    }

    return (
      <div>
        <h1>anna palautetta</h1>

        <Button text="hyvä" handleClick={this.handleFeedback('hyva')} />
        <Button text="neutraali" handleClick={this.handleFeedback('neutraali')} />
        <Button text="huono" handleClick={this.handleFeedback('huono')} />

        <h1>statistiikka</h1>

        <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono}/>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'));
