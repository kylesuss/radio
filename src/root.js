import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRedirect from 'react-router/lib/IndexRedirect'
import browserHistory from 'react-router/lib/browserHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store/configure-store'
import App from 'components/app'
import Station from 'pages/station'
import randomStation from 'utils/random-station'
import { STATION_PATH, buildStationPath } from 'constants/routes'
import ga from 'ga-react-router'

export const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
history.listen(location => {
  ga('set', 'page', location.pathname + location.search)
  ga('send', 'pageview')
})

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRedirect to={buildStationPath(randomStation.slug)} />
            <Route path={STATION_PATH} component={Station} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
