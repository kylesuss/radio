import React from 'react'
import { mount, shallow } from 'enzyme'
import stationFixture from 'fixtures/station'
import { Player } from './player'
import AudioPlayer from './audio-player'

const nextStation = { ...stationFixture, name: ':nextStationName' }
const prevStation = { ...stationFixture, name: ':prevStationName' }

const props = {
  station: stationFixture,
  isPlaying: false,
  togglePlayState: jest.fn(),
  playStation: jest.fn(),
  prevStation: prevStation,
  nextStation: nextStation,
  videoHasActiveAudio: false
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
