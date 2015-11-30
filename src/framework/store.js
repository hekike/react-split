import _ from 'lodash'

export default class Store {
  constructor (reducer) {
    this.state = {}
    this.reducer = reducer
  }

  getState () {
    return this.state
  }

  subscribe (eventBus) {
    return eventBus
      .ratelimit(1, 100)  // slow down events
      .map(data => this.getNextState(data))
  }

  getNextState (state, event) {
    this.state = this.reducer(_.merge({}, this.state, state), event)

    return this.state
  }
}
