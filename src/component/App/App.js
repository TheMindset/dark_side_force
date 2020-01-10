import React, { Component } from 'react';
import './App.scss'
import { Route } from 'react-router-dom'

import { getFilms, getCharacters } from '../api/apiCalls'
import Container from '../Container/Container'
import Form from '../Form/Fom';
import Nav from '../Nav/Nav'
import Scroll from '../Scroll/Scroll'

class App extends Component {
  constructor() {
    super()
    this.state = {
      characters: [],
      selectedMovie: {},
      characherLoad: false,
      movies: [],
      movieLoad: false,
      userInfos: {},
      isFormComplete: false
    }
  }

  componentDidMount() {
    getFilms()
    .then(data => this.setState({ movies: data, movieLoad: true }))
  }

  reachMovieCharacters = (event) => {
    let id = parseInt(event.target.id)
    let targetMovie = this.state.movies[id - 1]
    this.setState({ 
      selectedMovie: targetMovie, 
      characherLoad: false,
      characters: []
    })
    getCharacters(id)
    .then(data => this.setState({ characters: data, characherLoad: true }))
  }

  getFormData = (userInfos) => {
    this.setState({ userInfos: userInfos, isFormComplete: true })
  }

  render() {
    const { movies, userInfos, characters, isFormComplete, characherLoad, selectedMovie } = this.state
    return (
      <main className='App'>
        <div>
          { isFormComplete && <Nav user={userInfos} /> }
          <Route exact path='/' render={() => <Form getFormData={this.getFormData}/>} />  
          <Route exact path='/movies' render={() => <Container cards={movies} reachMovieCharacters={this.reachMovieCharacters}/>} />
          { characherLoad && <Route exact path='/movies/:id' render={() => <Container cards={characters}/>} /> }
          { !characherLoad && <Scroll selectedMovie={selectedMovie}/> }
        </div>
      </main>
    )
  }
}
export default App;
