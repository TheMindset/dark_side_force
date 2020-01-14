import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { getFilms, getCharacters } from '../../Util/api/apiCalls'

jest.mock('../../Util/api/apiCalls')

describe('App', () => {
  let wrapper, mockFilms

  beforeEach(() => {
    mockFilms = [
      {
        title: 'The Avengers',
        episode: 1,
        releaseYear: 2012,
        id: 1
      },
      {
        title: 'Avengers: Age of Ultron',
        episode: 2,
        releaseYear: 2015,
        id: 2
      }  
    ]

    getFilms.mockImplementation(() => {
      return Promise.resolve(mockFilms)
    })
    wrapper = shallow(<App />)
  })

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  test('should retreive films after mounting', () => {
    shallow(<App />)

    expect(getFilms).toHaveBeenCalled()
  })

  test('should update the user state when getFormData is called', () => {
    const mockUserInfos = {
      name: 'Tony Startk',
      quote: 'The king in north',
      rank: 'Dead'
    }

    window.localStorage = jest.fn()

    expect(wrapper.state('userInfos')).toEqual({})
    expect(wrapper.state('isFormComplete')).toEqual(false)
    wrapper.instance().getFormData(mockUserInfos)
    expect(wrapper.state('userInfos')).toEqual(mockUserInfos)
    expect(wrapper.state('isFormComplete')).toEqual(true)
  })
  
  test('should update favorites state when toggleFavorite is called on externe favorite', () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      homeworld: 'Tattooine',
      population: 200000,
      species: 'Human',
      films: [ 'Terrible', 'Incroyable']    
    }

    expect(wrapper.state('favorites')).toEqual([])
    wrapper.instance().toggleFavorite(mockCharacter)
    expect(wrapper.state('favorites')).toEqual([mockCharacter])
  })

  test('should update favorites state when toggleFavorite is called on interne favorite', () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      homeworld: 'Tattooine',
      population: 200000,
      species: 'Human',
      films: [ 'Terrible', 'Incroyable']    
    }

    wrapper.instance().setState({ favorites: [mockCharacter]})
    expect(wrapper.state('favorites')).toEqual([mockCharacter])
    wrapper.instance().toggleFavorite(mockCharacter)
    expect(wrapper.state('favorites')).toEqual([])
  })

  test('should update characters state when reachMovieCharacters is called', async () => {
    const mockCharacters = [
      {
        name: 'Luke Skywalker',
        homeworld: 'Tattooine',
        population: 200000,
        species: 'Human',
        films: [ 'Terrible', 'Incroyable']
      },
      {
        name: 'Luke C3-PO',
        homeworld: 'Tattooine',
        population: 200000,
        species: 'Droid',
        films: ['All of them', 'Terrible']
      }
    ]

    getCharacters.mockImplementation(() => {
      return Promise.resolve(mockCharacters)
    })
  
    const mockEvent = { target: {id: 1} }

    wrapper.instance().setState({ movies: mockEvent, characterLoad: false })
    expect(wrapper.state('characters')).toEqual([])
    expect(wrapper.state('characterLoad')).toEqual(false)
    
    await wrapper.instance().reachMovieCharacters(mockEvent)

    expect(wrapper.state('characters')).toEqual(mockCharacters)
    expect(wrapper.state('characterLoad')).toEqual(true)
    expect(getCharacters).toHaveBeenCalled()
  })

  test('should update userInfos state when logOut is called', () => {
    const mockUser = {
      name: 'Tony Startk',
      quote: 'The king in north',
      rank: 'Dead'
    }
    
    wrapper.instance().setState({ userInfos: mockUser })
    expect(wrapper.state('userInfos')).toEqual(mockUser)
    expect(wrapper.state('isFormComplete')).toEqual(true)

    wrapper.instance().logOut()
    expect(wrapper.state('userInfos')).toEqual({})
    expect(wrapper.state('isFormComplete')).toEqual(false)
  })
  
  
})
