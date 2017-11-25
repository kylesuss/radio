import cleanLiveInfo from 'utils/clean-live-info'

export default ({ body }) => {
  if (!body.current) { return null }

  const isInactive = !!body.current.name.match(/Live streaming back on Monday/)
  const status = cleanLiveInfo(body.current.name)

  return {
    timezone: null,
    current: {
      ...(isInactive ? { isInactive: true, inactiveStatus: status } : { show: status })
    }
  }
}
