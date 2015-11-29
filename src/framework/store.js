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

  getNextState (event) {
    this.state = this.reducer(this.state, event)

    return this.state
  }
}
