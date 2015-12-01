'use strict'

import React, { Component, PropTypes } from 'react'
import Store from './store'
import Dispatcher from './dispatcher'

export default function connect (ComponentToWrap, selectProps, localStore) {
  class Connect extends Component {
    constructor (props, context) {
      super(props)

      this.dispatch = this.dispatch.bind(this)
      this.subscribe = null
      this.state = {
        props: null
      }

      if (localStore) {
        this.localDispatchSubscribe = context.dispatcher.register(localStore)
      }
    }

    componentWillMount () {
      let stateStream = this.context.store.stateSubject

      if (localStore) {
        stateStream = stateStream.merge(localStore.stateSubject)
      }

      this.subscribe = stateStream.subscribe(nextState => this.setState({
        props: nextState
      }))
    }

    shouldComponentUpdate () {
      return !!this.state.props
    }

    componentWillUnmount () {
      if (this.subscribe) {
        this.subscribe.dispose()
      }

      if (this.localDispatchSubscribe) {
        this.localDispatchSubscribe.dispose()
      }
    }

    dispatch (action) {
      this.context.dispatcher.dispatch(action)
    }

    render () {
      const { dispatch } = this

      const props = typeof selectProps === 'function' ? selectProps(this.state.props) : {}

      return <ComponentToWrap {...this.props} {...props} dispatch={dispatch} />
    }
  }

  Connect.displayName = 'Connect'

  Connect.contextTypes = {
    store: PropTypes.instanceOf(Store).isRequired,
    dispatcher: PropTypes.instanceOf(Dispatcher).isRequired
  }

  return Connect
}
