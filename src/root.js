import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import configureStore from 'store/configure-store'
import App from 'components/app'
import { ROOT_PATH } from 'constants/routes'

export const store = configureStore()

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={ROOT_PATH} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default Root
