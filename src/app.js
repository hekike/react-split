'use strict'

import React from 'react'
import { render } from 'react-dom'

import Root from './root'

import { Store, Provider } from './framework'

const reducer = function (state, event) {
  if (event.type === 'NAME_CHANGE') {
    this.state.name = event.name
  } else if (event.type === 'NAME_UPPERCASE') {
    this.state.name = event.name.toUpperCase()
  }

  return state
}
const store = new Store(reducer)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
