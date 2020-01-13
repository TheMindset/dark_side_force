import React from 'react'
import { shallow } from 'enzyme'
import Container from './Container'


describe('Container whithout favorites', () => {
  const mockFavorites = []
  const mockToggleFavorite = jest.fn()

  let wrapper

  test('should ', () => {
    wrapper = shallow(
      <Container
        cards={mockFavorites}
        type='favorites'
        favorites={mockFavorites}
        toggleFavorite={mockToggleFavorite}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Container with favorites', () => {
  const mockFavorites = [
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
  const mockToggleFavorite = jest.fn()

  let wrapper

  test('should ', () => {
    wrapper = shallow(
      <Container
        cards={mockFavorites}
        type='favorites'
        favorites={mockFavorites}
        toggleFavorite={mockToggleFavorite}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Container with characters', () => {
  const mockCharacters = [
    {
      name: 'Captain America',
      homeworld: 'Terre',
      population: 200000000,
      species: 'Human',
      films: [ 'All Avengers', "It's crazy"]
    },
    {
      name: 'Thor',
      homeworld: 'Asgard',
      population: 20,
      species: 'Asgardian',
      films: ['All Avengers', 'So crazy man!!']
    }
  ]
  const mockToggleFavorite = jest.fn()

  let wrapper

  test('should ', () => {
    wrapper = shallow(
      <Container
        cards={mockCharacters}
        type='characters'
        toggleFavorite={mockToggleFavorite}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})


describe('Container with movies', () => {
  const mockMovies = [
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
  const mockToggleFavorite = jest.fn()

  let wrapper

  test('should ', () => {
    wrapper = shallow(
      <Container
        cards={mockMovies}
        toggleFavorite={mockToggleFavorite}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
