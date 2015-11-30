'use strict'

import React from 'react'
import { render } from 'react-dom'

import Root from './root'

import { Store, Provider } from './framework'

// reducer for gobal store
const reducer = function (prevState, event) {
  if (event.type === 'NAME_CHANGE') {
    return {
      name: event.name
    }
  } else if (event.type === 'NAME_UPPERCASE') {
    return {
      name: event.name.toUpperCase()
    }
  }

  return prevState
}

// global store for the app
const store = new Store(reducer)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
