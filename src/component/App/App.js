import React, { Component } from 'react';
import './App.scss'
import { Route } from 'react-router-dom'

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
    const { movies } = this.state
    return (
      <main className='App'>
        <div>
          <Route exact path='/movies' render={ () => <Container movies={movies}/> } />
        </div>
      </main>
    )
  }
}
export default App;
