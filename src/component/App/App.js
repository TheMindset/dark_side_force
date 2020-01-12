import React, { Component } from 'react';
import './App.scss'
import { Route } from 'react-router-dom'

import { getFilms, getCharacters } from '../api/apiCalls'
import Container from '../Container/Container'
import Form from '../Form/Form';
import Nav from '../Nav/Nav'
import Scroll from '../Scroll/Scroll'

class App extends Component {
  constructor() {
    super()
    this.state = {
      characters: [],
      selectedMovie: {},
      characherLoad: true,
      movies: [],
      movieLoad: false,
      userInfos: {},
      isFormComplete: false,
      favorites: [],
      error: ''
    }
  }

  componentDidMount() {
    getFilms()
    .then(data => this.setState({ movies: data, movieLoad: true }))
    .catch(error => this.setState({ error: error }))

    if (localStorage.getItem('favorites')) {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites'))
      this.setState({ favorites: storedFavorites })
    }

    if (localStorage.getItem('userInfos')) {
      const storedUser = JSON.parse(localStorage.getItem('userInfos'))
      this.setState({ userInfos: storedUser, isFormComplete: true })
    }
  }

  toggleFavorite = (character) => {
    this.state.favorites.map(favorite => favorite.name)
    .includes(character.name) ? this.removeFavorite(character) : this.addFavorite(character)
  }

  addFavorite = (character) => {
    const newFavorites = [...this.state.favorites, character]
    this.setState({ favorites: newFavorites })
    localStorage.setItem('favorites', JSON.stringify(newFavorites) )
  }

  removeFavorite = (character) => {
    let newFavorites = this.state.favorites.filter(favorite => favorite.name !== character.name)
    this.setState({ favorites: newFavorites })
    localStorage.setItem('favorites', JSON.stringify(newFavorites) )
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
    localStorage.setItem('userInfos', JSON.stringify(userInfos))
  }

  logOut = () => {
    localStorage.clear()
    this.setState({ isFormComplete: false, userInfos: {} })
  }

  render() {
    const { movies, userInfos, characters, isFormComplete, characherLoad, selectedMovie, favorites, movieLoad, error} = this.state
    return (
      <main className='App'>
        <div>
          <Route exact path='/' render={() => <Form getFormData={this.getFormData}/>} />  
          { isFormComplete && <Nav user={userInfos} logOut={this.logOut} numFav={favorites.length}/> }
          { error && <div className='loading-img'></div> }
          <Route exact path='/movies' render={() => <Container cards={movies} reachMovieCharacters={this.reachMovieCharacters} />} />
          { characherLoad && <Route exact path='/movies/:id' render={() => <Container type ='characters' cards={characters} toggleFavorite={this.toggleFavorite} favorites={favorites}/>} /> }
          <Route exact path='/favorites' render={() => <Container type='favorites' cards={favorites} favorites={favorites} toggleFavorite={this.toggleFavorite}/> }/>
          { movieLoad && !characherLoad && <Scroll selectedMovie={selectedMovie}p/> }
        </div>
      </main>
    )
  }
}
export default App;
