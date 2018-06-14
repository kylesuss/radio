import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.shows.current) { return null }

  const trackName = body.tracks && body.tracks.current && body.tracks.current.name
  const showName = body.shows && body.shows.current && body.shows.current.name
  const showNameTextToReplace = ' (Follow @wwfmnowplaying Twitter for details)'

  return {
    current: {
      show: cleanLiveInfo(trackName) || cleanLiveInfo(showName.replace(showNameTextToReplace, ''))
    }
  }
}
