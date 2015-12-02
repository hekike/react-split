'use strict'

import React, { Component, PropTypes } from 'react'
import Store from './store'
import Dispatcher from './dispatcher'

export default function connect (ComponentToWrap, selectProps,
    initialData, reducer, filterBy) {
  /**
  * @class Connect
  */
  class Connect extends Component {
    constructor (props, context) {
      super(props)

      this.dispatch = this.dispatch.bind(this)
      this.subscribes = []
      this.state = {
        globalProps: null,
        localProps: null
      }

      this.localStore = null

      if (initialData && reducer) {
        this.localStore = new Store(initialData, reducer)
      }

      if (this.localStore) {
        const actionFilter = event => filterBy(event, this.props)

        this.subscribes.push(
          context.dispatcher.register(this.localStore, actionFilter)
        )
      }
    }

    componentWillMount () {
      let globalStateStream = this.context.store.stateSubject

      this.subscribes.push(
        globalStateStream.subscribe(nextState => this.setState({
          globalProps: nextState
        }))
      )

      if (this.localStore) {
        let localStateStream = this.localStore.stateSubject

        this.subscribes.push(
          localStateStream.subscribe(nextState => this.setState({
            localProps: nextState
          }))
        )
      }
    }

    shouldComponentUpdate (nextProps, nextState) {
      const globalStateChanged = this.state.globalProps !== nextState.globalProps
      const localStateChanged = this.state.localProps !== nextState.localProps

      return globalStateChanged || localStateChanged
    }

    componentWillUnmount () {
      this.subscribes.forEach(subscribe => subscribe.dispose())
    }

    dispatch (action) {
      this.context.dispatcher.dispatch(action)
    }

    render () {
      const { dispatch } = this
      const props = typeof selectProps === 'function'
        ? selectProps(this.state.globalProps, this.state.localProps) : {}

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
