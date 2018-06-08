import React from 'react'
import { shallow } from 'enzyme'
import stationFixture from 'fixtures/station'
import { App, DEFAULT_TITLE } from './app'

jest.mock('root', () => ({
  store: jest.fn()
}))

const props = {
  activeStation: null,
  playerIsPlaying: false,
}

test('it shows the default title when there is no active station playing', () => {
  const wrapper = shallow(<App {...props} />)
  expect(wrapper.instance().documentTitle).toEqual(DEFAULT_TITLE)
})

test('it shows the station title when there is an active station playing', () =>{
  const wrapper = shallow(<App {...props} playerIsPlaying activeStation={stationFixture} />)
  expect(wrapper.instance().documentTitle).toEqual(`${stationFixture.name} | ${DEFAULT_TITLE}`)
})
