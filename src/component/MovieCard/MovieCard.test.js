import React from 'react'
import { shallow } from 'enzyme'
import MovieCard from './MovieCard'


describe('MovieCard', () => {
  let wrapper, mockMovie, mockReachMovieCharacter

  beforeEach(() => {
    mockReachMovieCharacter = jest.fn()
    mockMovie = {
      title: 'The GodFather',
      episode: 1,
      releaseYear: 1972,
      id:  2      
    }
    wrapper = shallow(<MovieCard movie={mockMovie} reachMovieCharacters={mockReachMovieCharacter} />)
  })

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call reachMovieCharacters on Click event', () => {
    wrapper.find('Link').simulate('click')

    expect(mockReachMovieCharacter).toHaveBeenCalled()
  })
})
