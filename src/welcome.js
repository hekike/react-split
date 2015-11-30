'use strict'

import React, { Component, PropTypes } from 'react'
import { connect, Store } from './framework'

/**
* @class Welcome
*/
class Welcome extends Component {

  /**
   * @method render
   * @return {JSX}
   */
  render () {
    return (<h2>
      {`${this.props.hello} ${this.props.name}!`}
    </h2>)
  }
}

Welcome.displayName = 'Welcome'

Welcome.propTypes = {
  hello: PropTypes.string,
  name: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function selectProps (state) {
  return {
    hello: state.hello,
    name: state.name
  }
}

// local store and reducer for Welcome component
const localReducer = function (prevState, event, globalState) {
  if (event.type === 'NAME_CHANGE') {
    return {
      hello: 'Szia',
      name: globalState.name + ' Doe'
    }
  }

  return prevState
}

const localStore = new Store(localReducer)

export default connect(Welcome, selectProps, localStore)
