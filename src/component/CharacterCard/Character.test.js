import React from 'react'
import { shallow } from 'enzyme'
import CharacterCard from './CharacterCard'

describe('CharacterCard', () => {
  let wrapper
  let mockToggleFavorites = jest.fn()

  let mockCharacter = {
    name: 'Luke Skywalker',
    homeworld: 'Tattooine',
    population: 200000,
    species: 'Human',
    films: [ 'Terrible', 'Incroyable']
  }

  let mockFavorites = [mockCharacter]

  beforeEach(() => {
    wrapper = shallow(
      <CharacterCard 
        character={mockCharacter}
        toggleFavorite={mockToggleFavorites}
        favorites={mockFavorites}
      />
    )
  })

  test('should math snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should favorite/unfovarite a character when clicked', () => {
    wrapper.find('button').simulate('click')

    expect(mockToggleFavorites).toHaveBeenCalled()
  })
})

