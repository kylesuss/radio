export const findStationBySlug = (stations, slug) => {
  return stations.find(station => station.slug === slug)
}
