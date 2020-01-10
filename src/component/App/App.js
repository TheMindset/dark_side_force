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
      isFormComplete: false,
      favorites: []
    }
  }

  componentDidMount() {
    getFilms()
    .then(data => this.setState({ movies: data, movieLoad: true }))
  }

  toggleFavorite = (character) => {
    this.state.favorites.map(favorite => favorite.name)
    .includes(character.name) ? this.removeFavorite(character) : this.addFavorite(character)
  }

  addFavorite = (character) => {
    this.setState({ favorites: [...this.state.favorites, character] })
  }

  removeFavorite = (character) => {
    let newFavorites = this.state.favorites.filter(favorite => favorite.name !== character.name)
    this.setState({ favorites: newFavorites })
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
    const { movies, userInfos, characters, isFormComplete, characherLoad, selectedMovie, favorites } = this.state
    return (
      <main className='App'>
        <div>
          { isFormComplete && <Nav user={userInfos} /> }

          <Route exact path='/' render={() => <Form getFormData={this.getFormData}/>} />  
          <Route exact path='/movies' render={() => <Container cards={movies} reachMovieCharacters={this.reachMovieCharacters} />} />
          { characherLoad && <Route exact path='/movies/:id' render={() => <Container type ='characters' cards={characters} toggleFavorite={this.toggleFavorite} favorites={favorites}/>} /> }
          { !characherLoad && <Scroll selectedMovie={selectedMovie}/> }
          <Route exact path='/favorites' render={() => <Container type='favorites' cards={favorites} favorites={favorites} toggleFavorite={this.toggleFavorite}/> }/>
        </div>
      </main>
    )
  }
}
export default App;
