import React, { Component } from 'react';
import { getFilms } from '../api/apiCalls'
import './App.css';

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
      </div>
    )
  }
}
export default App;
