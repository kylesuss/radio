export const findStationBySlug = (stations, slug) => {
  return stations.find(station => station.slug === slug)
}

export const findPrevStationBySlug = (stations, activeStationSlug) => {
  const activeStation = findStationBySlug(stations, activeStationSlug)
  const activeIndex = stations.indexOf(activeStation)
  const lastIndex = stations.length - 1

  return activeIndex - 1 >= 0
    ? stations[activeIndex - 1]
    : stations[lastIndex]
}

export const findNextStationBySlug = (stations, activeStationSlug) => {
  const activeStation = findStationBySlug(stations, activeStationSlug)
  const activeIndex = stations.indexOf(activeStation)
  const lastIndex = stations.length - 1

  return activeIndex + 1 <= lastIndex
    ? stations[activeIndex + 1]
    : stations[0]
}
