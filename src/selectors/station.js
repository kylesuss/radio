import { DEFAULT_STREAM_NUMBER } from 'constants/player'
import { buildStationPath } from 'constants/routes'
import first from 'lodash/first'
import last from 'lodash/last'

export const findStationBySlug = (stations, slug) => {
  return stations.find(station => station.slug === slug)
}

export const findPrevStationUrl = (
  stations,
  activeStationSlug,
  currentStreamNumber
) => {
  const activeStation = findStationBySlug(stations, activeStationSlug)

  if (currentStreamNumber > DEFAULT_STREAM_NUMBER) {
    const nextStream = activeStation.streams[parseInt(currentStreamNumber) - 2]
    return buildStationPath(activeStationSlug, nextStream.number)
  }

  const activeIndex = stations.indexOf(activeStation)
  const lastIndex = stations.length - 1
  const prevStation = activeIndex - 1 >= 0
    ? stations[activeIndex - 1]
    : stations[lastIndex]
  const prevStreamNumber = last(prevStation.streams).number

  return buildStationPath(prevStation.slug, prevStreamNumber)
}

export const findNextStationUrl = (
  stations,
  activeStationSlug,
  currentStreamNumber
) => {
  const activeStation = findStationBySlug(stations, activeStationSlug)
  const nextStream = activeStation.streams[parseInt(currentStreamNumber)]

  if (nextStream) {
    return buildStationPath(activeStationSlug, nextStream.number)
  }

  const activeIndex = stations.indexOf(activeStation)
  const lastIndex = stations.length - 1
  const nextStation = activeIndex + 1 <= lastIndex
    ? stations[activeIndex + 1]
    : stations[0]
  const nextStreamNumber = first(nextStation.streams).number

  return buildStationPath(nextStation.slug, nextStreamNumber)
}
