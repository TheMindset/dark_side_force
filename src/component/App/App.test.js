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
})
