import React from 'react'
import PropTypes from 'prop-types'
import MovieCard from '../MovieCard/MovieCard'

const Container = ({ movies }) => {
  const allMovies = movies.map(movie => {
    return <MovieCard key={movie.episode} movie={movie} />
  })

  return (
    <section> {allMovies} </section>
  )
}

export default Container

Container.propTypes = {
  movies: PropTypes.array.isRequired
}