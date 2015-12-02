'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from '../src'
import { fromJS } from 'immutable'

/**
* @class CatDetailPage
*/
class CatDetailPage extends Component {

  /**
   * @method render
   * @return {JSX}
   */
  render () {
    const { id, name } = this.props

    const detailStyle = {
      width: '100%',
      border: '1px solid #ccc',
      margin: '10px 0'
    }

    return (<div style={detailStyle}>
      {'Local store of <CatDetailPage> container with id: '} {id}<br/>
      <strong>{name}</strong>
    </div>)
  }
}

CatDetailPage.displayName = 'CatDetailPage'

CatDetailPage.propTypes = {
  id: PropTypes.number.isRequired,
  hello: PropTypes.string,
  name: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function selectProps (state, localState) {
  return {
    name: localState.get('name')
  }
}

// reducer for local (container's) store
const localReducer = function (prevState, action) {
  if (action.type === 'CAT_NAME_CHANGE') {
    return prevState.set('name', action.name)
  }

  return prevState
}

// initial data for local (container's) store
const initialData = fromJS({
  name: 'Initial name'
})

// event filter for local (container's) store
// local receiver only receives events which match to this filter
const eventFilter = (event, props) => event.catId === props.id

export default connect(CatDetailPage, selectProps,
  initialData, localReducer, eventFilter)
