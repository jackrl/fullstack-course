import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: new Array(this.props.anecdotes.length).fill(0)
    }
  }

  handleNextAnecdote = () => {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
    }

    let newAnecdote
    do {
      newAnecdote = getRandomInt(this.props.anecdotes.length)
    } while (newAnecdote === this.state.selected)
    this.setState({selected : newAnecdote})
  }

  handleVoteAnecdote = () => {
    const newVotes = this.state.votes.slice()
    newVotes[this.state.selected] = this.state.votes[this.state.selected] + 1
    this.setState({votes : newVotes})
  }

  findMostVoted = () => {
    return this.state.votes.indexOf(Math.max.apply(null, this.state.votes))
  }

  render() {
    const Anecdote = (props) => {
      const {anecdotes, votes, anecdote} = props
      if (votes[anecdote] === 1) {
        return (
          <div>
            <div>{anecdotes[anecdote]}</div>
            <div>has {votes[anecdote]} vote</div>
          </div>
        )
      }
      return (
        <div>
          <div>{anecdotes[anecdote]}</div>
          <div>has {votes[anecdote]} votes</div>
        </div>
      )
    }

    return (
      <div>
        <Anecdote anecdotes={this.props.anecdotes} votes={this.state.votes} anecdote={this.state.selected} />
        <div>
          <button onClick={this.handleVoteAnecdote}>vote</button>
          <button onClick={this.handleNextAnecdote}>next anecdote</button>
        </div>
        <h1>anecdote with most votes:</h1>
        <Anecdote anecdotes={this.props.anecdotes} votes={this.state.votes} anecdote={this.findMostVoted()} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)