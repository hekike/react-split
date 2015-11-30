'use strict'

import React, { Component, PropTypes } from 'react'

export default function connect (ComponentToWrap, selectProps, store) {
  class Data extends Component {
    constructor (props, context) {
      super(props)

      this.store = context.store
      this.eventBus = context.eventBus
      this.states = this.eventBus.stateStream

      this.dispatch = this.dispatch.bind(this)

      if (store) {
        this.states = this.eventBus.subscribe(store)
      }
    }

    componentWillMount () {
      this.states
        .fork()
        .each(data => {
          this.setState(data.nextState)
        })
    }

    dispatch (data) {
      this.eventBus.dispatch(data)
    }

    render () {
      const props = this.state
      const { dispatch } = this

      return <ComponentToWrap {...this.props} {...props} dispatch={dispatch} />
    }
  }

  Data.displayName = 'Data'

  Data.contextTypes = {
    store: PropTypes.object.isRequired,
    eventBus: PropTypes.object.isRequired
  }

  return Data
}
