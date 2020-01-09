import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-card'>
      <h2> {movie.title} </h2>
      <h3> {movie.episode} </h3>
      <h3> {movie.releaseYear} </h3>
      <Link to={`movies/${movie.id}`}>
        <button>Explore Characters</button>
      </Link>
    </div>
  )
}

export default MovieCard

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}