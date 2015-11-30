'use strict'

import React, { Component, PropTypes } from 'react'

export default function connect (ComponentToWrap, selectProps, store) {
  class Connect extends Component {
    constructor (props, context) {
      super(props)

      this.dispatch = context.eventBus.dispatch.bind(context.eventBus)
      this.stateStream = context.eventBus.stateStream

      if (store) {
        this.stateStream = context.eventBus.subscribe(store)
      }
    }

    componentWillMount () {
      this.stateStream
        .fork()
        .each(data => {
          this.setState(data.nextState)
        })
    }

    render () {
      const props = this.state
      const { dispatch } = this

      return <ComponentToWrap {...this.props} {...props} dispatch={dispatch} />
    }
  }

  Connect.displayName = 'Connect'

  Connect.contextTypes = {
    store: PropTypes.object.isRequired,
    eventBus: PropTypes.object.isRequired
  }

  return Connect
}
