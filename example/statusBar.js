'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from '../src'

/**
* @class StatusBar
*/
class StatusBar extends Component {

  /**
   * @method render
   * @return {JSX}
   */
  render () {
    const style = {
      width: '100%',
      height: '40px',
      position: 'fixed',
      backgroundColor: '#ccc'
    }

    const { status } = this.props

    return (<div style={style}>
      <p>{'<StatusBar> uses global store:'} <strong>{status}</strong></p>
    </div>)
  }
}

StatusBar.displayName = 'StatusBar'

StatusBar.propTypes = {
  status: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function selectProps (state) {
  return {
    status: state.get('status')
  }
}

export default connect(StatusBar, selectProps)
