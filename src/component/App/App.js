import React, { Component } from 'react';
import './App.css'
import { getFilms } from '../api/apiCalls'
import Container from '../Container/Container'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    getFilms()
    .then(data => this.setState({ movies: data }))
  }

  render() {
    return (
      <div>
        <h1>The Dark Side Force</h1>
        <Container movies={this.state.movies} />
      </div>
    )
  }
}
export default App;
