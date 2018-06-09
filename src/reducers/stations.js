import stationsFixtures from 'fixtures/stations'
import sortBy from 'lodash/sortBy'

const activeStations = stationsFixtures.filter(station => station.isActive)

const sortItems = (items, sortOptions) => sortBy(items, (item) => (
  item.name.toLowerCase()
))

const initialState = {
  items: sortItems(activeStations)
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    default:
      return { ...state }
  }
}
