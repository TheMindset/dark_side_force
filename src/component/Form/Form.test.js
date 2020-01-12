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
    const mockNameEvent = { target: { name: 'name', value: 'Hola' }, preventDefault: jest.fn() }

    const expected = 'Hola'
    wrapper.instance().handleChange(mockNameEvent)
    expect(wrapper.state('name')).toEqual(expected)
  })

  test('should call getFormData when Submit is clicked', () => {
    const prevDefaultEvent = { preventDefault: jest.fn() }

    wrapper.setState({
      name: 'Hola',
      quote: 'I am the best',
      rank: 'Padawan'
    })

    wrapper.find('button').simulate('click', prevDefaultEvent)
    expect(mockGetFormData).toHaveBeenCalled()
  })
  
  test('should return IsComplete false and an error if the quote is miising when Submit is clicked', () => {
    const mockEvent = { target: { name: 'name', value: 'Terminator' } }

    const prevDefaultEvent = { preventDefault: jest.fn() }

    wrapper.instance().handleChange(mockEvent)
    wrapper.find('button').simulate('click', prevDefaultEvent)

    expect(wrapper.state('isComplete')).toEqual(false)
    expect(wrapper.state('quoteErr')).toEqual(true)
  })
  
  test('should return IsComplete false and an error if the name is miising when Submit is clicked', () => {
    const mockEvent = { target: { name: 'quote', value: 'I am the master of my destiny' } }

    const prevDefaultEvent = { preventDefault: jest.fn() }

    wrapper.instance().handleChange(mockEvent)
    wrapper.find('button').simulate('click', prevDefaultEvent)

    expect(wrapper.state('isComplete')).toEqual(false)
    expect(wrapper.state('nameErr')).toEqual(true)
  })

  test('should run handleChange when the inputs change', () => {
    const mockNameEvent = { target: { name: 'name', value: 'Viola Davis' } }
    const mockQuoteEvent = { target: { name: 'quote', value: 'Think and grow' } }

    wrapper.instance().handleChange = jest.fn()

    wrapper.instance().forceUpdate()

    wrapper.find('[name="name"]').simulate('change', mockNameEvent)
    wrapper.find('[name="quote"]').simulate('change', mockQuoteEvent)

    expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockNameEvent)
    expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockQuoteEvent)
  })

})
