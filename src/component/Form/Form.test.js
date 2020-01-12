import React from 'react'
import { shallow } from 'enzyme'
import Form from './Form'

describe('Form', () => {
  let wrapper, mockGetFormData

  beforeEach(() => {
    mockGetFormData = jest.fn()
    wrapper = shallow(<Form getFormData={mockGetFormData}/>)
  })

  test('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  test('should update state when handleChange is called', () => {
    const mockEvent = { target: { name: 'name', value: 'Hola' }, preventDefault: jest.fn() }

    const expected = 'Hola'
    wrapper.instance().handleChange(mockEvent)
    expect(wrapper.state('name')).toEqual(expected)
  })
})
