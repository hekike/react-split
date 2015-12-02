import Rx from 'rx'

export default class Dispatcher {
  constructor () {
    this.subject = new Rx.Subject()
  }

  dispatch (data) {
    this.subject.onNext(data)
  }

  register (store, filter) {
    let subject = this.subject

    // send only user specified actions
    if (typeof filter === 'function') {
      subject = this.subject.filter(filter)
    }

    return subject.subscribe(
      (data) => store.dispatcherSubject.onNext(data)
    )
  }
}
