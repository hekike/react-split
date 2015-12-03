'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from '../src'

import StatusBar from './StatusBar'
import CatDetailPage from './catDetailPage'

import { changeCatName, setStatus, setStatusAsync } from './actions'

/**
* @class Root
*/
class Root extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    // dispatch events
    dispatch(changeCatName(1, 'Garfield'))
    setTimeout(() => dispatch(changeCatName(2, 'Casper')), 600)

    setTimeout(() => dispatch(setStatus('Status 1')), 200)
    setTimeout(() => dispatch(setStatusAsync('Status 2')), 600)
  }

  /**
   * @method render
   * @return {JSX}
   */
  render () {
    const containerStyle = {
      width: '100%',
      float: 'left',
      marginTop: '40px'
    }

    return (<div>
      <StatusBar />
      <div style={containerStyle}>
        <CatDetailPage id={1} />
        <CatDetailPage id={2} />
      </div>
    </div>)
  }
}

Root.displayName = 'Root'

Root.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(Root)
