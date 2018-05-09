import React from 'react'
import { App, DEFAULT_TITLE } from './app'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

jest.mock('root', () => ({
  store: jest.fn()
}))

const props = {
  activeStation: null,
  playerIsPlaying: false,
}

test('the document title is the default title', () => {
  const wrapper = shallow(<App  {...props} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('it shows the default title when there is no active station playing', () => {
  const wrapper = shallow(<App {...props} />)
  expect(wrapper.instance().documentTitle).toEqual(DEFAULT_TITLE)
})

test('it shows the station title when there is an active station playing', () =>{
  const activeStation = { name: ':name' }
  const wrapper = shallow(<App {...props} playerIsPlaying activeStation={activeStation} />)
  expect(wrapper.instance().documentTitle).toEqual(`${activeStation.name} | ${DEFAULT_TITLE}`)
})
