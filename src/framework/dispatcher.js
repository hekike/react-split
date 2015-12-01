import Rx from 'rx'

export default class Dispatcher {
  constructor () {
    this.subject = new Rx.Subject()
  }

  dispatch (data) {
    this.subject.onNext(data)
  }

  register (store) {
    return this.subject.subscribe(
      (data) => store.dispatcherSubject.onNext(data)
    )
  }
}
