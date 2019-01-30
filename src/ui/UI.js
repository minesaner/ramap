import React from 'react'
import {loadUIScript} from '../loadScript'

class MapUI extends React.PureComponent {
  state = {scriptLoaded: false}

  componentDidMount() {
    loadUIScript().then(() => {
      this.setState({scriptLoaded: true})
    })
  }

  render() {
    const {scriptLoaded} = this.state
    if (!scriptLoaded || React.Children.count(this.props.children) === 0) return null

    return this.props.children
  }
}

export default MapUI
