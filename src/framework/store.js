export default class Store {
  constructor (reducer) {
    this.state = {}
    this.reducer = reducer
  }

  getNextState (globalState, event) {
    this.state = this.reducer(this.state, event, globalState)

    return this.state
  }
}
