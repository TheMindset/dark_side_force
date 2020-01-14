import { getFilms, getCharacters } from './apiCalls'

describe('getFilms', () => {
  let mockResponse

  beforeEach(()=>{ 
    mockResponse = {results: [
      {
        title: 'Scarface',
        scrollText: 'Al Pacino is a legend',
        id:1,
        releaseYear: '1983',
        episode: 1
      }, 
      {
        title: 'Righteous Kill',
        scrollText: 'Robert De Niro & Al Pacino. You must saw this movie',
        id: 3,
        releaseYear: '2008',
        episode: 7
      }
    ]}

    window.fetch = jest.fn().mockImplementation(()=>{
      return Promise.resolve({
        ok:true,
        json: () => Promise.resolve(mockResponse)
      })
    })
  })

  it('should call fetch with correct URL', () => {
    getFilms()

    expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/films')
  })

  it('should return an array of films', () => {
    expect(getFilms()).resolves.toEqual(mockResponse)
  })

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Unable to fetch'))
    })

    expect(getFilms()).rejects.toEqual(Error('Unable to fetch'))
  })
})

describe('getCharacters', () => {
  let mockCharacters

  beforeEach(() => {
    mockCharacters = [{
      name: 'Matt Demon',
      homeworld: 'Mars',
      population: 1,
      species: "Martians",
      films: ['The Departed', 'Invictus']
    }]
    
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve()
    })
  })

  it('should call fetch with correct URL', () => {
    getCharacters(2)

    expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/films/2')
  })
  
  it('should return an array of characters', () => {
    expect(getCharacters()).resolves.toEqual(mockCharacters)
  })

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Unable to fetch'))
    })

    expect(getFilms()).rejects.toEqual(Error('Unable to fetch'))
  })
})