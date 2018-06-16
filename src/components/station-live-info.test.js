import React from 'react'
import { mount } from 'enzyme'
import * as constants from 'constants/live-info'
import stationFixture from 'fixtures/station'
import flushPromises from 'jest/flush-promises'
import StationLiveInfo, { REFETCH_INTERVAL } from './station-live-info'
import { get as getUrl } from 'utils/async'

jest.useFakeTimers()
jest.mock('utils/async', () => ({
  get: jest.fn(() => new Promise(resolve => resolve({ body: ':currentTrack' }))),
}))

const modelResponse = ({ body }) => ({
  [constants.LIVE_INFO_CURRENT_KEY]: body
})

beforeEach(() => {
  constants.LIVE_INFO_MODELS = { [stationFixture.slug]: modelResponse }
})

const props = {
  station: stationFixture
}

test('it fetches the station data', async () => {
  const wrapper = mount(<StationLiveInfo {...props} />)

  expect(wrapper.state('isLoading')).toEqual(true)
  expect(getUrl).toHaveBeenCalledTimes(1)

  await flushPromises()

  expect(wrapper.instance().refetchInterval).toBeDefined()
  expect(wrapper.state('isLoading')).toEqual(false)
  expect(wrapper.state('liveStationInfo')).toEqual({
    [constants.LIVE_INFO_CURRENT_KEY]: ':currentTrack',
    [constants.LIVE_INFO_STATUS_KEY]: constants.LIVE_INFO_ACTIVE_STATUS
  })

  jest.runTimersToTime(REFETCH_INTERVAL)

  expect(getUrl).toHaveBeenCalledTimes(2)

  const nextProps = { station: { ...props.station, slug: ':nextStation' } }
  wrapper.instance().componentWillReceiveProps(nextProps)

  expect(wrapper.state('liveStationInfo')).toBeNull()
})
