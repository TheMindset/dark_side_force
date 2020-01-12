import React from 'react'
import { shallow } from 'enzyme'
import Nav from './Nav'

describe('Nav', () => {
  let wrapper, mockUser, mockLogOut, mockNumFav

  beforeEach(() => {
    mockLogOut = jest.fn()
    mockNumFav = 3
    mockUser = {
      name: 'Hola',
      quote: 'The force of your mind',
      rank: 'Padawan'
    }
    wrapper = shallow(<Nav user={mockUser} logOut={mockLogOut} numFav={mockNumFav} />)
  })

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
