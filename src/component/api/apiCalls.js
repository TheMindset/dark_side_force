export const getFilms = () => {
  return fetch('https://swapi.co/api/films')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, please retry`)
    }
    return response.json()
  })
  .then(data => data.results)
  .then(allFilms => sortFilmsByEpisode(allFilms))
  .catch(error => console.log(error))
}

const sortFilmsByEpisode = (allFilms) => {
  return allFilms.sort((a, b) => a.episode_id - b.episode_id)
  .map(film => {
    return {
      title: film.title,
      episode: film.episode_id,
      releaseYear: film.release_date.slice(0, 4)
    }
  })
} 