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
  .then(chars => getCharacterHomeworldData(chars))
  .then(chars => getCharacterSpeciesData(chars))
  .then(chars => getCharacterFilmsData(chars))
}

const getCharacterHomeworldData = (chars) => {
  const homeworldData = chars.map(char => {
    return fetch(char.homeworld)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, please retry`)
      }
      return response.json()
    })
    .then(homeworld => {
      return {
        ...char,
        name: homeworld.name,
        population: homeworld.population
      }
    })
  })
  return Promise.all(homeworldData)
}

const getCharacterSpeciesData = (chars) => {
  const speciciesData = chars.map(char => {
    return fetch(char.species)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, please retry`)
      }
      return response.json()
    })
    .then(specie => {
      return {
        ...char,
        name: specie.name
      }
    })
  })
  return Promise.all(speciciesData)
}

const getCharacterFilmsData = (chars) => {
 const filmsData = chars.map(char => {
   const filmsName = char.films.map(film => {
     return fetch(film)
     .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, please retry`)
      }
      return response.json()
    })
    .then(film => film.title)
   })
   return Promise.all(filmsName)
   .then(namesOfFilms => {
     return {
       ...char,
       films: namesOfFilms
     }
   })
 })
 console.log(filmsData)
 return Promise.all(filmsData)
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