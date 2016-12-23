export const SORT_STATIONS = 'SORT_STATIONS'

export const sortStations = (sortKeyArray) => {
  return {
    type: SORT_STATIONS,
    sortKeyArray
  }
}
