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

const reducer = function (state, event) {
  if (event.type === 'NAME_CHANGE') {
    return {
      hello: 'Szia',
      name: state.name + ' Doe'
    }
  }

  return state
}

export default connect(Welcome, selectProps, new Store(reducer))
