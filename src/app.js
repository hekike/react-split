'use strict'

import React from 'react'
import { render } from 'react-dom'
import { fromJS } from 'immutable'

import Root from './root'

import { Store, Provider } from './framework'

// reducer for gobal store
const reducer = function (prevState, action) {
  if (action.type === 'NAME_CHANGE') {
    return prevState.set('name', action.name)
  } else if (action.type === 'NAME_UPPERCASE') {
    return prevState.set('name', action.name.toUpperCase())
  }

  return prevState
}

// global store for the app
const store = new Store(fromJS({
  name: null
}), reducer)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
