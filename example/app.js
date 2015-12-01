'use strict'

import React from 'react'
import { render } from 'react-dom'
import { fromJS } from 'immutable'

import Root from './root'

import { Store, Provider } from '../src'

// reducer for gobal store
const reducer = function (prevState, action) {
  if (action.type === 'STATUS_CHANGE') {
    return prevState.set('status', action.status)
  }

  return prevState
}

// global store for the app
const store = new Store(fromJS({
  status: 'Initial status'
}), reducer)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
