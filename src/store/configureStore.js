import rootReducer from 'reducers'
import { createStore, compose } from 'redux'

export default function configureStore () {
  return createStore(
    rootReducer,
    compose(
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
