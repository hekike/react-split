'use strict'

import React, { Component, PropTypes } from 'react'
import Store from './store'
import Dispatcher from './dispatcher'

export default function connect (ComponentToWrap, selectProps, initialData, reducer, filterBy) {
  class Connect extends Component {
    constructor (props, context) {
      super(props)

      this.dispatch = this.dispatch.bind(this)
      this.subscribe = null
      this.state = {
        props: null,
        localProps: initialData
      }

      this.localStore = null

      if (initialData && reducer) {
        this.localStore = new Store(initialData, reducer)
      }

      if (this.localStore) {
        this.localDispatchSubscribe = context.dispatcher
          .register(this.localStore, event => filterBy(event, this.props))
      }
    }

    componentWillMount () {
      let stateStream = this.context.store.stateSubject

      this.subscribe = stateStream.subscribe(nextState => this.setState({
        props: nextState
      }))

      if (this.localStore) {
        let localStateStream = this.localStore.stateSubject
        this.localSubscribe = localStateStream.subscribe(nextState => this.setState({
          localProps: nextState
        }))
      }
    }

    shouldComponentUpdate () {
      return !!this.state.props
    }

    componentWillUnmount () {
      if (this.subscribe) {
        this.subscribe.dispose()
      }

      if (this.localSubscribe) {
        this.localSubscribe.dispose()
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

      const props = typeof selectProps === 'function' ? selectProps(this.state.props, this.state.localProps) : {}

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
