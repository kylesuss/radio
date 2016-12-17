import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store/configureStore'
import Home from 'containers/home'
import Station from 'containers/station'
import { STATION_PATH } from 'constants/routes'
import 'styles/base.css'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Home} />
          <Route path={STATION_PATH} component={Station} />
        </Router>
      </Provider>
    )
  }
}
