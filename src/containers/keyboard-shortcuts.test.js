import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { buildStationPath } from 'constants/routes'
import { findPrevStationBySlug, findNextStationBySlug } from 'selectors/station'
import {
  withKeyboardShortcuts,
  SPACE_KEY,
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY
} from './keyboard-shortcuts'

jest.mock('selectors/station', () => ({
  findPrevStationBySlug: jest.fn(() => ({ slug: ':prevStationSlug' })),
  findNextStationBySlug: jest.fn(() => ({ slug: ':nextStationSlug' }))
}))

const TestComponent = () => <div>test</div>

const Shortcuts = withKeyboardShortcuts(TestComponent)

const props = {
  playStation: jest.fn(),
  router: { push: jest.fn() },
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
    const prevStationSlug = ':prevStationSlug'
    const event = { keyCode: LEFT_ARROW_KEY }
    window.addEventListener = buildMockEventListener(event)

    const wrapper = mount(<Shortcuts {...props} />)

    expect(props.playStation).toHaveBeenCalledWith(prevStationSlug)
    expect(props.router.push).toHaveBeenCalledWith(buildStationPath(prevStationSlug))
  })

  test('it handles the right arrow key', () => {
    const nextStationSlug = ':nextStationSlug'
    const event = { keyCode: RIGHT_ARROW_KEY }
    window.addEventListener = buildMockEventListener(event)

    const wrapper = mount(<Shortcuts {...props} />)

    expect(props.playStation).toHaveBeenCalledWith(nextStationSlug)
    expect(props.router.push).toHaveBeenCalledWith(buildStationPath(nextStationSlug))
  })
})
