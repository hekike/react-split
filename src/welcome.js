'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from './framework'

/**
* @class Welcome
*/
class Welcome extends Component {
  componentWillMount () {
    const { dispatch } = this.props

    dispatch({
      type: 'NAME_CHANGE',
      name: 'Smith'
    })
    dispatch({
      type: 'NAME_CHANGE',
      name: 'John'
    })
    dispatch({
      type: 'NAME_CHANGE',
      name: 'Samantha'
    })

    dispatch({
      type: 'NAME_UPPERCASE',
      name: 'Samantha'
    })
  }

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

Welcome.displayName = 'Welcome'

Welcome.propTypes = {
  name: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function selectProps (state) {
  return {
    name: state.name
  }
}

export default connect(Welcome, selectProps)
