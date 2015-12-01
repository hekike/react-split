import { Component, PropTypes, Children } from 'react'
import Store from './store'
import Dispatcher from './dispatcher'

export default class Provider extends Component {
  constructor (props, context) {
    super(props, context)

    this.dispatcher = new Dispatcher()
    this.store = props.store

    this.storeDispatcher = this.dispatcher.register(this.store)
  }

  getChildContext () {
    return {
      store: this.store,
      dispatcher: this.dispatcher
    }
  }

  componentWillUnmount () {
    this.storeDispatcher.dispose()
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
  dispatcher: PropTypes.instanceOf(Dispatcher).isRequired
}
