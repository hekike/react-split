'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from './framework'

/**
* @class WelcomeGlobal
*/
class WelcomeGlobal extends Component {

  /**
   * @method render
   * @return {JSX}
   */
  render () {
    return (<h2>
      {`Hello ${this.props.name}!`}
    </h2>)
  }
}

WelcomeGlobal.displayName = 'WelcomeGlobal'

WelcomeGlobal.propTypes = {
  name: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function selectProps (state) {
  return {
    name: state.get('name')
  }
}

export default connect(WelcomeGlobal, selectProps)
