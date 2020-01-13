import React from 'react'
import { shallow } from 'enzyme'
import Scroll from './Scroll'


describe('Scroll', () => {
  const mockSelectedMovie = {
    title: 'The GodFather',
    episode: 2,
    scrollText: 'Hé bambino...'
  }

  let wrapper = shallow (<Scroll selectedMovie={mockSelectedMovie}/>)

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
