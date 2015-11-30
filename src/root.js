'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from './framework'

import Welcome from './welcome'
import WelcomeGlobal from './welcomeGlobal'
import Content from './content'

/**
* @class Root
*/
class Root extends Component {
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
    return (<div>
      {'Global store:'} <WelcomeGlobal />
    {'Global store + local:'} <Welcome />
      <Content content={'Foo'} />
    </div>)
  }
}

Root.displayName = 'Root'

Root.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(Root)
