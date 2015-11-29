'use strict'

import React, { Component } from 'react'

import Welcome from './welcome'
import Content from './content'

/**
* @class Root
*/
class Root extends Component {

  /**
   * @method render
   * @return {JSX}
   */
  render () {
    return (<div>
      <Welcome />
      <Content content={'Foo'} />
    </div>)
  }
}

Root.displayName = 'Root'

export default Root
