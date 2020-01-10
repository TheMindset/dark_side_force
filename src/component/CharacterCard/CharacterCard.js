import React from 'react'
import PropTypes from 'prop-types'
import './CharacterCard.scss'

const CharacterCard = ({ character, toggleFavorite, favorites }) => {
  const { name, homeworld, population, species, films } = character

  const isFavorite = favorites.map(char => char.name).includes(name) ? 'favorite' : ''
  const btnMessage = isFavorite ? 'Remove Favorite' : 'Add Favorite'

  const allFilms = films.map(film => {
    return <li key={film}> {film} </li>
  })

  return (
    <div className="character-card">
      <h2>{name}</h2>
      <h3>Homeworld: {homeworld}</h3>
      <h3>Population: {population} </h3>
      <h3>Species: {species} </h3>
      <ul>Films: {allFilms}</ul>
  <button id={name} onClick={() => {toggleFavorite(character)}}>{btnMessage}</button>
    </div>
  )
}

export default CharacterCard

CharacterCard.propTypes = {
  character: PropTypes.object.isRequired
}