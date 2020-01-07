export const getFilms = () => {
  return fetch('https://swapi.co/api/films')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, please retry`)
    }
    return response.json()
  }) 
  .then(data => data.results)
  .then(allMovies => allMovies.sort((a, b) => a.episode_id - b.episode_id)
  .catch(error => console.log(error))
}