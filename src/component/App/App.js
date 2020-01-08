import React, { Component } from 'react';
import './App.scss'
import { getFilms, getCharacters } from '../api/apiCalls'
import Container from '../Container/Container'

class App extends Component {
  constructor() {
    super()
    this.state = {
      characters: [],
      movies: []
    }
  }

  componentDidMount() {
    getFilms()
    .then(data => this.setState({ movies: data }))
    getCharacters(1)
    .then(data => this.setState({ characters: data}))
  }

  render() {
    return (
      <main className='App'>
        <div>
          <h1>The Dark Side Force</h1>
          <Container movies={this.state.movies} />
        </div>
      </main>
    )
  }
}
export default App;
