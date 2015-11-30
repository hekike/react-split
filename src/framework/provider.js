import { Component, PropTypes, Children } from 'react'
import Store from './store'
import EventBus from './eventBus'

export default class Provider extends Component {
  constructor (props, context) {
    super(props, context)

    this.store = props.store
    this.eventBus = new EventBus(this.store)
  }

  getChildContext () {
    return {
      store: this.store,
      eventBus: this.eventBus
    }
  }

  render () {
    const { children } = this.props
    return Children.only(children)
  }
}

Provider.displayName = 'Provider'

Provider.propTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  children: PropTypes.element.isRequired
}
Provider.childContextTypes = {
  store: PropTypes.instanceOf(Store).isRequired,
  eventBus: PropTypes.object.isRequired
}
