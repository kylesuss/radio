import rootReducer from 'reducers'
import { createStore, compose } from 'redux'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

const reducer = compose(
  mergePersistedState((initialState, persistedState) => {
    return {
      ...initialState,
      ...persistedState,
      player: {
        ...persistedState.player,
        isPlaying: initialState.player.isPlaying,
        audioPlayerVolume: initialState.player.audioPlayerVolume
      },
      stations: {
        ...persistedState.stations,
        items: initialState.stations.items
      }
    }
  })
)(rootReducer)

const storage = compose(
  filter(['player', 'stations']),
)(adapter(window.localStorage))

const enhancer = compose(
  persistState(storage, 'app'),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export default function configureStore () {
  return createStore(reducer, enhancer)
}
