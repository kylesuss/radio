import stationsFixtures from 'fixtures/stations'
import { NAME_SORT_KEY_ARRAY } from 'constants/stations'
import sortBy from 'lodash/sortBy'

const initialState = {
  sortKeyArray: NAME_SORT_KEY_ARRAY,
  items: stationsFixtures
}

const sortItems = (items, sortKeyArray) => sortBy(items, sortKeyArray)

export default function (state = initialState, action = {}) {
  switch (action.type) {
    default:
      return {
        ...state,
        items: sortItems(state.items, state.sortKeyArray)
      }
  }
}
