import React from 'react'
import './Container.scss'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'
import CharacterCard from '../CharacterCard/CharacterCard'

const Container = ({ cards }) => {
  const allCards = cards.map(card => {
    if (card.title) {
      return <MovieCard key={card.episode} movie={card} />
    }
      return <CharacterCard key={card.name} character={card}/>
  })

  return (
    <section className="container"> {allCards} </section>
  )
}

export default Container

Container.propTypes = {
  cards: PropTypes.array.isRequired
}
