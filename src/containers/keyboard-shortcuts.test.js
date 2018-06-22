import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { buildStationPath } from 'constants/routes'
import {
  withKeyboardShortcuts,
  SPACE_KEY,
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY
} from './keyboard-shortcuts'

const TestComponent = () => <div>test</div>

const Shortcuts = withKeyboardShortcuts(TestComponent)

const props = {
  history: { push: jest.fn() },
  match: { params: { streamNumber: ':streamNumber' } },
  nextStationUrl: ':nextStationUrl',
  prevStationUrl: ':prevStationUrl',
  togglePlayState: jest.fn()
}

test('it sets and removes the event handlers', () => {
  const mockAddEventListener = jest.fn()
  const mockRemoveEventListener = jest.fn()

  window.addEventListener = mockAddEventListener
  window.removeEventListener = mockAddEventListener

  const wrapper = mount(<Shortcuts {...props} />)

  expect(mockAddEventListener).toHaveBeenCalled()

  wrapper.unmount()

  expect(removeEventListener).toHaveBeenCalled()
})

describe('event handler behavior', () => {
  const buildMockEventListener = (event) => (
    jest.fn((eventName, callback) => callback(event))
  )

  test('it handles the space key', () => {
    const event = { keyCode: SPACE_KEY, preventDefault: jest.fn() }
    window.addEventListener = buildMockEventListener(event)

    const wrapper = mount(<Shortcuts {...props} />)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(props.togglePlayState).toHaveBeenCalled()
  })

  test('it handles the left arrow key', () => {
    const event = { keyCode: LEFT_ARROW_KEY }
    window.addEventListener = buildMockEventListener(event)

    const wrapper = mount(<Shortcuts {...props} />)

    expect(props.history.push).toHaveBeenCalledWith(props.prevStationUrl)
  })

  test('it handles the right arrow key', () => {
    const event = { keyCode: RIGHT_ARROW_KEY }
    window.addEventListener = buildMockEventListener(event)

    const wrapper = mount(<Shortcuts {...props} />)

    expect(props.history.push).toHaveBeenCalledWith(props.nextStationUrl)
  })
})
