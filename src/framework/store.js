export default class Store {
  constructor (reducer) {
    this.state = {}
    this.reducer = reducer
  }

  getState () {
    return this.state
  }

  getNextState (event) {
    this.state = this.reducer(this.state, event)

    return this.state
  }
}
