import rootReducer from 'reducers'
import { createStore, compose, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore () {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
        routerMiddleware(browserHistory)
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
