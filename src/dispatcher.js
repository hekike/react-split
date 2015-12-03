import Rx from 'rx'

export default class Dispatcher {
  constructor () {
    this.subject = new Rx.Subject()

    this.stores = []

    this.dispatch = this.dispatch.bind(this)
  }

  dispatch (data) {
    if (typeof data === 'function') {
      const globalStore = this.stores[0]
      const getState = () => globalStore.prevStateSubject.getValue(1)
      data(this.dispatch, getState)
      return
    }
    this.subject.onNext(data)
  }

  register (store, filter) {
    let subject = this.subject

    this.stores.push(store)

    // send only user specified actions
    if (typeof filter === 'function') {
      subject = this.subject.filter(filter)
    }

    return subject.subscribe(
      (data) => store.dispatcherSubject.onNext(data),
      (err) => console.error(err),
      () => {
        const idx = this.stores.indexOf(store)
        this.stores.splice(idx, 1)
      }
    )
  }
}
