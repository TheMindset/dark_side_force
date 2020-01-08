import React from 'react'
import PropTypes from 'prop-types'

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-card'>
      <h2> {movie.title} </h2>
      <h3> {movie.episode} </h3>
      <h3> {movie.releaseYear} </h3>
      <button>Explore Characters</button>
    </div>
  )
}

export default MovieCard

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}