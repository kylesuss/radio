import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.current) { return null }

  const isInactive = !!body.current.name.match(/Live streaming back on Monday/) ||
                     !!body.current.name.match(/Live streaming starts at noon/)
  const status = cleanLiveInfo(body.current.name)

  return {
    current: {
      ...(isInactive ? { isInactive: true, inactiveStatus: status } : { show: status })
    }
  }
}
