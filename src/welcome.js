'use strict'

import React, { Component, PropTypes } from 'react'
import { connect, Store } from './framework'
import { fromJS } from 'immutable'

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
    hello: state.get('hello'),
    name: state.get('name')
  }
}

// local store and reducer for Welcome component
const localReducer = function (prevState, action) {
  if (action.type === 'NAME_CHANGE') {
    return prevState
      .set('hello', 'szia')
      .update('name', name => name + ' Doe')
  }

  return prevState
}

const localStore = new Store(fromJS({
  hello: 'Ciao',
  name: 'Foo'
}), localReducer)

export default connect(Welcome, selectProps, localStore)
