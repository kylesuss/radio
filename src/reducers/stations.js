import stationsFixtures from 'fixtures/stations'
import sortBy from 'lodash/sortBy'

const initialState = {
  items: stationsFixtures
}

const sortItems = (items, sortOptions) => sortBy(items, (item) => (
  item.name.toLowerCase()
))

export default function (state = initialState, action = {}) {
  switch (action.type) {
    default:
      return {
        ...state,
        items: sortItems(state.items)
      }
  }
}
