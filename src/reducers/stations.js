import stationsFixtures from 'fixtures/stations'
import { SORT_STATIONS } from 'actions/stations'
import { NAME_SORT_KEY_ARRAY } from 'constants/stations'
import sortBy from 'lodash/sortBy'

const initialState = {
  sortKeyArray: NAME_SORT_KEY_ARRAY,
  items: stationsFixtures
}

const sortItems = (items, sortKeyArray) => sortBy(items, sortKeyArray)

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SORT_STATIONS:
      return {
        ...state,
        sortKeyArray: action.sortKeyArray,
        items: sortItems(state.items, action.sortKeyArray)
      }
    default:
      return {
        ...state,
        items: sortItems(state.items, state.sortKeyArray)
      }
  }
}
