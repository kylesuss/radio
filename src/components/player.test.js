import React from 'react'
import { mount, shallow } from 'enzyme'
import { buildStationPath } from 'constants/routes'
import stationFixture from 'fixtures/station'
import { Player } from './player'
import AudioPlayer from './audio-player'

const prevStationSlug = ':prevStationSlug'
const prevStation = { ...stationFixture, slug: prevStationSlug }
const nextStationSlug = ':nextStationSlug'
const nextStation = { ...stationFixture, slug: nextStationSlug }

const props = {
  isPlaying: false,
  nextStation: nextStation,
  playStation: jest.fn(),
  prevStation: prevStation,
  router: { push: jest.fn() },
  station: stationFixture,
  togglePlayState: jest.fn()
}

test('it only renders the audio player when a streamUrl is present', () => {
  const wrapper = shallow(<Player {...props} isPlaying />)
  const audioPlayerComponent = wrapper.find(AudioPlayer)
  expect(audioPlayerComponent.exists()).toEqual(true)

  const nextProps = { ...props, isPlaying: false }
  wrapper.instance().componentWillReceiveProps(nextProps)
  wrapper.update()

  const missingAudioPlayerComponent = wrapper.find(AudioPlayer)
  expect(missingAudioPlayerComponent.exists()).toEqual(false)
})

test('it handles the previous button click', () => {
  const wrapper = shallow(<Player {...props} />)
  const prevButton = wrapper.find('player__StyledSeekButton').at(0)

  prevButton.simulate('click')

  expect(props.playStation).toHaveBeenCalledWith(prevStationSlug)
  expect(props.router.push).toHaveBeenCalledWith(buildStationPath(prevStationSlug))
})

test('it handles the next button click', () => {
  const wrapper = shallow(<Player {...props} />)
  const nextButton = wrapper.find('player__StyledSeekButton').at(1)

  nextButton.simulate('click')

  expect(props.playStation).toHaveBeenCalledWith(nextStationSlug)
  expect(props.router.push).toHaveBeenCalledWith(buildStationPath(nextStationSlug))
})

test('it handles the play state button click', () => {
  const wrapper = shallow(<Player {...props} />)
  const playStateButton = wrapper.find('player__StyledPlayStateButton')

  playStateButton.simulate('click')

  expect(props.togglePlayState).toHaveBeenCalled()
})
