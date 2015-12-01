'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from '../src'

import StatusBar from './StatusBar'
import CatDetailPage from './catDetailPage'

/**
* @class Root
*/
class Root extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    // dispatch events
    dispatch({
      type: 'CAT_NAME_CHANGE',
      id: 1,
      name: 'Garfield'
    })

    setTimeout(() => dispatch({
      type: 'STATUS_CHANGE',
      status: 'Status 1'
    }), 200)

    setTimeout(() => dispatch({
      type: 'CAT_NAME_CHANGE',
      id: 2,
      name: 'Casper'
    }), 600)

    setTimeout(() => dispatch({
      type: 'STATUS_CHANGE',
      status: 'Status 2'
    }), 800)
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
