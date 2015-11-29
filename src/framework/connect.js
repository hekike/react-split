'use strict'

import React, { Component, PropTypes } from 'react'

export default function connect (ComponentToWrap, selectProps) {
  class Data extends Component {
    constructor (props, context) {
      super(props)

      this.store = context.store
      this.eventBus = context.eventBus
      this.state = selectProps(this.store.getState())

      this.dispatch = this.dispatch.bind(this)
    }

    componentWillMount () {
      this.eventBus
        .ratelimit(1, 100)  // slow down events
        .each(data => {
          const state = this.store.getNextState(data)

          this.setState(state)
        })
    }

    dispatch (data) {
      this.eventBus.write(data)
    }

    render () {
      const props = selectProps(this.state)
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
