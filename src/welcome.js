'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from './framework'

/**
* @class Welcome
*/
class Welcome extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    dispatch({
      type: 'NAME_CHANGE',
      name: 'Smith'
    })

    setTimeout(() => dispatch({
      type: 'NAME_CHANGE',
      name: 'John'
    }), 200)

    setTimeout(() => dispatch({
      type: 'NAME_CHANGE',
      name: 'Samantha'
    }), 600)

    setTimeout(() => dispatch({
      type: 'NAME_UPPERCASE',
      name: 'Upper'
    }), 800)
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
