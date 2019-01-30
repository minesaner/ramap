import React from 'react'
import {loadMapScript} from '../loadScript'

class Plugin extends React.PureComponent {
  state = {scriptLoaded: false}
  plugins = []

  render() {
    const {scriptLoaded} = this.state
    if (!scriptLoaded) return null

    return this.props.children
  }

  loadPlugins() {
    const {children} = this.props
    if (React.Children.count(children) > 0) {
      const plugins = React.Children.map(children, child => {
        const pluginName = child.type.displayName

        if (!this.plugins.includes(pluginName)) {
          this.plugins.push(pluginName)
          return pluginName
        }
      }).filter(Boolean)

      if (plugins.length) {
        loadMapScript.loadPlugins(plugins).then(() => {
          this.setState({scriptLoaded: true})
        })
      }
    }
  }

  componentDidMount() {
    this.loadPlugins()
  }

  componentDidUpdate() {
    this.loadPlugins()
  }
}

export default Plugin
