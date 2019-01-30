import React from 'react'
import {Consumer} from './ContextMap'

const withMap = (Component) => class extends React.Component {
  render() {
    return (
      <Consumer>
        {
          map => {
            return <Component {...this.props} map={map} />
          }
        }
      </Consumer>
    )
  }
}

export default withMap
