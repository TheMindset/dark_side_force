export const getFilms = () => {
  return fetch('https://swapi.co/api/films')
    .then(response => {
      if(!response.ok) {
        throw Error('Could not fetch films, please refresh the page and try again')
      }
      return response.json()})
    .then(data => sortFilmsByReleaseDate(data))
}

const sortFilmsByReleaseDate = (data) => {
  return data.results.sort((a, b) => {
    let yearA = parseInt(a.release_date.slice(0, 4));
    let yearB = parseInt(b.release_date.slice(0, 4));
    return yearA - yearB
  }).map((movie,i) => {
    return {
      title: movie.title,
      scrollText: movie.opening_crawl,
      id: i + 1,
      episode: movie.episode_id,
      releaseYear: movie.release_date.slice(0, 4)
    }
  })
}

export const getCharacters = (id) => {
  let url = `https://swapi.co/api/films/${id}`
  return fetch(url).then(res => {
    if(!res.ok) {
      throw Error('Unable to fetch characters, click the movies tab and try again')
    }
    return res.json()})
  .then(data => data.characters)
  .then(data => cleanCharacterData(data))
  .then(chars => getSpeciesDataForCharacter(chars))
  .then(chars => getHomeWorldDataForCharacter(chars))
  .then(chars => getRelatedFilmsForCharacter(chars))

}

const cleanCharacterData = (characterUrls) => {
  let charactersData = characterUrls.map(charUrl => {
    return fetch(charUrl).then(res => res.json()).then(data => {
      return {
        name:data.name,
        homeworld: data.homeworld,
        species: data.species,
        films: data.films
      }
    })
  })
  return Promise.all(charactersData)
}

const getSpeciesDataForCharacter = (chars) => {
  let speciesData = chars.map(char => {
    if (char.species.length === 0) {
      return {
        ...char,
        species: 'Unknown'
      }
    }
    return fetch(char.species).then(res => res.json()).then(species => {
      return {
        ...char,
        species: species.name
        }
      })
    }
  )
  return Promise.all(speciesData)
}

const getHomeWorldDataForCharacter = (chars) => {
  let homeworldData = chars.map(char => {
    return fetch(char.homeworld).then(res => res.json()).then(homeworld => {
      return {
        ...char,
        homeworld: homeworld.name,
        population: homeworld.population
      }
    })
  })
  return Promise.all(homeworldData)
}

const getRelatedFilmsForCharacter = (chars) => {
  let relatedFilmsData = chars.map(char => {
    let filmNames = char.films.map(film => {
      return fetch(film).then(res => res.json()).then(film => film.title)
    })
    return Promise.all(filmNames).then(namesOfFilms => {
      return {
        ...char,
        films: namesOfFilms
      }
    }
    )
  })
  return Promise.all(relatedFilmsData)
}