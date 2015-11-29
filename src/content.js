'use strict'

import React, { Component, PropTypes } from 'react'

/**
* @class Content
*/
class Content extends Component {

  /**
   * @method render
   * @return {JSX}
   */
  render () {
    return (<p>
      {this.props.content}
    </p>)
  }
}

Content.displayName = 'Content'

Content.propTypes = {
  content: PropTypes.string.isRequired
}

export default Content
