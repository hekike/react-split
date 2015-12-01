import Rx from 'rx'

export default class Store {
  constructor (initialState, reducer) {
    this.dispatcherSubject = new Rx.BehaviorSubject(initialState)
    this.stateSubject = this.dispatcherSubject.scan(reducer)
  }

  dispatch (action) {
    return this.dispatcherSubject.onNext(action)
  }
}
