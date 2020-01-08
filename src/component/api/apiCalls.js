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
  .map((film, i) => {
    return {
      title: film.title,
      id: i + 1,
      episode: film.episode_id,
      releaseYear: film.release_date.slice(0, 4)
    }
  })
} 


export const getCharacters = (id) => {
  const url = `https://swapi.co/api/films/${id}`

  return fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}, please retry`)
    }
    return response.json()
  })
  .then(data => data.characters)
  .then(data => cleanCharacterData(data))
  .then()
}


const cleanCharacterData = (characterUrls) => {
  const characterData = characterUrls.map(charUrl => {
    return fetch(charUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, please retry`)
      }
      return response.json()
    })
    .then(data => {
      return {
        name: data.name,
        homeworld: data.homeworld,
        species: data.species,
        films: data.films
      }

    })
  })
  return Promise.all(characterData)
}