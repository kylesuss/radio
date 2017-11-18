/* global IS_SENTRY_ENABLED, SENTRY_CONFIG_URL */
import React from 'react'
import { render } from 'react-dom'
import Root from 'containers/root'
import Raven from 'raven-js'
import 'styles/global'

const renderApp = () => render(
  <Root />,
  document.getElementById('root')
)

if (IS_SENTRY_ENABLED === true) {
  Raven.config(SENTRY_CONFIG_URL).install()
  Raven.context(() => renderApp())
} else {
  renderApp()
}
