import React from 'react'
import { mount } from 'enzyme'
import Sound from 'react-sound'
import stationFixture from 'fixtures/station'
import { AUDIO_PLAYER_MAX_VOLUME } from 'constants/player'
import { AudioPlayer } from './audio-player'

const props = {
  audioPlayerVolume: AUDIO_PLAYER_MAX_VOLUME,
  handleSoundPlaying: jest.fn(),
  handleSoundError: jest.fn(),
  playerIsPlaying: false,
  streamUrl: ':streamUrl'
}

test('it calls setup on the sound manager to avoid excessive logging', () => {
  window.soundManager = { setup: jest.fn() }
  const wrapper = mount(<AudioPlayer {...props} />)
  expect(window.soundManager.setup).toHaveBeenCalledWith({ debugMode: false })
})

test('it handles sound playing', () => {
  const wrapper = mount(<AudioPlayer {...props} />)
  wrapper.instance().handleSoundPlaying()
  expect(props.handleSoundPlaying).toHaveBeenCalled()
})

test('it handles sound error', () => {
  const wrapper = mount(<AudioPlayer {...props} />)
  wrapper.instance().handleSoundError()
  expect(props.handleSoundError).toHaveBeenCalled()
})

describe('soundPlayStatus', () => {
  test('is STOPPED when the player is not playing', () => {
    const wrapper = mount(<AudioPlayer {...props} playerIsPlaying={false} />)
    expect(wrapper.instance().soundPlayStatus).toEqual(Sound.status.STOPPED)
  })

  test('is PLAYING when the player is playing', () => {
    const wrapper = mount(<AudioPlayer {...props} playerIsPlaying />)
    expect(wrapper.instance().soundPlayStatus).toEqual(Sound.status.PLAYING)
  })
})
