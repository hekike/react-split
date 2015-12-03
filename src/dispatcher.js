import Rx from 'rx'

export default class Dispatcher {
  constructor () {
    this.subject = new Rx.Subject()
    this.dispatch = this.dispatch.bind(this)
  }

  dispatch (data) {
    if (typeof data === 'function') {
      data(this.dispatch)
      return
    }
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
