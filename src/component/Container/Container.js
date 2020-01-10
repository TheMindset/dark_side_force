import React from 'react'
import './Container.scss'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import CharacterCard from '../CharacterCard/CharacterCard'

const Container = ({ cards, reachMovieCharacters, toggleFavorite, type, favorites }) => {
  console.log(favorites)
    if (type === 'favorites' && favorites.length === 0) {
      return (
        <div className="empty-favorites">
          <h3>Add some Favorites</h3>
        </div>
      )
    }

  let selectedCards = cards
  if (type === 'characters')
  {selectedCards = cards.slice(0, 10)}
  const allCards = selectedCards.map(card => {
    if (card.title) {
      return <MovieCard key={card.episode} movie={card} reachMovieCharacters={reachMovieCharacters}/>
    }
      return <CharacterCard key={card.name} character={card} toggleFavorite={toggleFavorite} favorites={favorites} />
  })

  return (
    <section className="container"> {allCards} </section>
  )
}

export default Container

Container.propTypes = {
  cards: PropTypes.array.isRequired,
  reachMovieCharacters: PropTypes.func.isRequired
}
