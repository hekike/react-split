import hl from 'highland'

export default class EventBus {
  constructor (store) {
    this.eventStream = hl()
    this.stateStream = hl()

    this.eventStream
      .map(event => ({
        event: event,
        nextState: store.getNextState({}, event)
      }))
      .pipe(this.stateStream)
  }

  subscribe (store) {
    return this.stateStream
      .fork()
      .map(data => ({
        event: data.event,
        nextState: store.getNextState(data.nextState, data.event)
      }))
  }

  dispatch (data) {
    this.eventStream.write(data)
  }
}
