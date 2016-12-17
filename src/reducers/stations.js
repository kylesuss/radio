import stationsFixtures from 'fixtures/stations'

const initialState = stationsFixtures

export default function (state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}
