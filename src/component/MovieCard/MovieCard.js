import React from 'react'
import './MovieCard.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie, reachMovieCharacters }) => {
  const { title, episode, releaseYear, id } = movie
  return (
    <div className="movie-card">
      <h2> {title} </h2>
      <h3> Episode: {episode} </h3>
      <h3> Released in {releaseYear} </h3>
      <Link onClick={reachMovieCharacters} to={`/movies/${id}`}>
        <button id={id}>Explore Characters</button>
      </Link>
    </div>
  )
}

export default MovieCard

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  reachMovieCharacters: PropTypes.func.isRequired
}