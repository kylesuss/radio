import React from 'react'
import { mount } from 'enzyme'
import TimeInTimezone, { UPDATE_INTERVAL } from './time-in-timezone'

const props = {
  children: (time) => time,
  timezone: 'America/New_York'
}

jest.useFakeTimers()

test('it sets and clears the update interval on mount', () => {
  const wrapper = mount(<TimeInTimezone {...props} />)
  const interval = wrapper.instance().updateTimeInterval

  window.clearInterval = jest.fn()

  expect(interval).toBeDefined()

  wrapper.unmount()

  expect(window.clearInterval).toHaveBeenCalledWith(interval)
})

test('it forces an update of the component at the interval', () => {
  const wrapper = mount(<TimeInTimezone {...props} />)

  window.console.error = () => {}
  wrapper.instance().forceUpdate = jest.fn()
  jest.runTimersToTime(UPDATE_INTERVAL)

  expect(wrapper.instance().forceUpdate).toHaveBeenCalled()
})
