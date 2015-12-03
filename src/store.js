import Rx from 'rx'

export default class Store {
  constructor (initialState, reducer) {
    this.dispatcherSubject = new Rx.BehaviorSubject(initialState)
    this.prevStateSubject = new Rx.BehaviorSubject(initialState)

    // TODO: better solution?
    this.nextStateSubject = this.dispatcherSubject.scan((action, prevState) => {
      const nextState = reducer(action, prevState)
      this.prevStateSubject.onNext(nextState)
      return nextState
    })
  }
}
