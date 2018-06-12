import React from 'react'
import { shallow } from 'enzyme'
import { VIDEO_TYPE_STREAM, VIDEO_TYPE_IFRAME } from 'constants/video'
import VideoPlayer from './video-player'

const props = {
  name: ':name',
  video: {
    type: VIDEO_TYPE_STREAM,
    url: ':videoUrl'
  }
}

test('it renders null with an error', () => {
  const wrapper = shallow(<VideoPlayer {...props} />)

  expect(wrapper.state('hasError')).toEqual(false)

  wrapper.instance().handleError()
  wrapper.update()

  expect(wrapper.state('hasError')).toEqual(true)
  expect(wrapper.html()).toBeNull()
})

test('it toggles the started state', () => {
  const wrapper = shallow(<VideoPlayer {...props} />)

  expect(wrapper.state('hasStarted')).toEqual(false)
  wrapper.instance().handleStart()
  expect(wrapper.state('hasStarted')).toEqual(true)
})

test('it renders the ReactPlayer when the video type is a stream', () => {
  const video = { ...props.video, type: VIDEO_TYPE_STREAM }
  const wrapper = shallow(<VideoPlayer {...props} video={video} />)
  const player = wrapper.find('ReactPlayer')
  const iframe = wrapper.find('iframe')

  expect(player.exists()).toEqual(true)
  expect(iframe.exists()).toEqual(false)
})

test('it renders the iframe when the video type is an iframe', () => {
  const video = { ...props.video, type: VIDEO_TYPE_IFRAME }
  const wrapper = shallow(<VideoPlayer {...props} video={video} />)
  const player = wrapper.find('ReactPlayer')
  const iframe = wrapper.find('iframe')

  expect(player.exists()).toEqual(false)
  expect(iframe.exists()).toEqual(true)
})

test('it resets the state for a new station', () => {
  const wrapper = shallow(<VideoPlayer {...props} />)
  const nextProps = { ...props, name: ':nextName' }

  wrapper.setState({ hasStarted: true, hasError: true })
  wrapper.instance().componentWillReceiveProps(nextProps)

  expect(wrapper.state('hasStarted')).toEqual(false)
  expect(wrapper.state('hasError')).toEqual(false)
})
