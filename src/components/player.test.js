import React from 'react'
import { mount, shallow } from 'enzyme'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import PlayerLoadingIcon from 'components/player-loading-icon'
import { buildStationPath } from 'constants/routes'
import { DEFAULT_STREAM_NUMBER } from 'constants/player'
import stationFixture from 'fixtures/station'
import { Player, uniqueStreamUrl } from './player'
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
  history: { push: jest.fn() },
  station: stationFixture,
  streamNumber: DEFAULT_STREAM_NUMBER,
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

test('it handles the play state button click', () => {
  const wrapper = shallow(<Player {...props} />)
  const playStateButton = wrapper.find('player__StyledPlayStateButton')

  playStateButton.simulate('click')

  expect(props.togglePlayState).toHaveBeenCalled()
})

test('it shows the appropriate play state icon when the loading audio source', () => {
  const wrapper = shallow(<Player {...props} />)
  wrapper.setState({ isLoadingAudioSrc: true })
  expect(wrapper.instance().playStateIcon.type).toEqual(PlayerLoadingIcon)
})

test('it shows the appropriate play state icon when playing', () => {
  const wrapper = shallow(<Player {...props} isPlaying />)
  wrapper.setState({ isLoadingAudioSrc: false })
  expect(wrapper.instance().playStateIcon.type).toEqual(PauseIcon)
})

test('it shows the appropriate play state icon when not playing', () => {
  const wrapper = shallow(<Player {...props} isPlaying={false} />)
  wrapper.setState({ isLoadingAudioSrc: false })
  expect(wrapper.instance().playStateIcon.type).toEqual(PlayIcon)
})

describe('prop changes', () => {
  const date = ':date'
  const nextStationSlug = ':nextStationSlug'
  const nextStationStreamUrl = ':nextStationStreamUrl'

  beforeEach(() => {
    window.Date.now = () => date
  })

  test('it sets the appropriate state when the station changes', () => {
    const wrapper = shallow(<Player {...props} />)
    const nextProps = {
      ...props,
      station: {
        ...props.station,
        slug: nextStationSlug,
        streams: [{
          number: DEFAULT_STREAM_NUMBER,
          url: nextStationStreamUrl,
          liveInfoUrl: ':nextStationLiveInfoUrl'
        }]
      }
    }

    wrapper.instance().componentWillReceiveProps(nextProps)
    wrapper.update()

    expect(wrapper.state('streamUrl')).toEqual(uniqueStreamUrl(nextStationStreamUrl))
    expect(wrapper.state('isLoadingAudioSrc')).toEqual(true)
  })

  test('it sets the appropriate state when the play state changes', () => {
    const wrapper = shallow(<Player {...props} isPlaying />)
    const pausedProps = { ...props, isPlaying: false }

    wrapper.instance().componentWillReceiveProps(pausedProps)
    wrapper.setProps({ isPlaying: false })

    expect(wrapper.state('streamUrl')).toBeNull()
    expect(wrapper.state('isLoadingAudioSrc')).toEqual(false)

    const playingProps = { ...props, isPlaying: true }

    wrapper.instance().componentWillReceiveProps(playingProps)
    wrapper.setProps({ isPlaying: true })

    expect(wrapper.state('streamUrl')).toEqual(uniqueStreamUrl(props.station.streams[0].url))
    expect(wrapper.state('isLoadingAudioSrc')).toEqual(true)
  })
})
