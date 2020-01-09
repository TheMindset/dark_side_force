import React, { Component } from 'react';
import './App.scss'
import { Route } from 'react-router-dom'

import { getFilms, getCharacters } from '../api/apiCalls'
import Container from '../Container/Container'
import Form from '../Form/Fom';
import Nav from '../Nav/Nav'

class App extends Component {
  constructor() {
    super()
    this.state = {
      characters: [],
      movies: [],
      userInfos: {},
      isFormComplete: false
    }
  }

  componentDidMount() {
    getFilms()
    .then(data => this.setState({ movies: data }))
    getCharacters(1)
    .then(data => this.setState({ characters: data}))
  }

  getFormData = (userInfos) => {
    this.setState({ userInfos: userInfos, isFormComplete: true })
  }

  render() {
    const { movies, userInfos, characters } = this.state
    return (
      <main className='App'>
        <div>
        { <Nav user={userInfos}/> }
          <Route exact path='/' render={() => <Form getFormData={this.getFormData}/>} />  
          <Route exact path='/movies' render={() => <Container cards={movies}/>} />
          <Route exact path='/movies/:id' render={() => <Container cards={characters}/>} />
        </div>
      </main>
    )
  }
}
export default App;
