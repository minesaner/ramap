import React from 'react'
import withMap from '../withMap'
import {loadUIScript} from '../loadScript'

function caplize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const withUI = name => processor => withMap(class extends React.Component {
  state = {Module: null}
  instance = null

  componentDidMount() {
    loadUIScript.loadModule(name).then(Module => {
      this.setState({Module})
    })
  }

  render() {
    const {Module} = this.state
    if (!Module) return null

    if (!this.instance) {
      const {children, ...config} = this.props
      this.instance = new Module({...config})

      processor.call(null, {
        props: this.props,
        map: this.props.map,
        instance: this.instance,
        Module,
      })
    } else {
      if (this.instance.setOptions) {
        const {children, map, ...config} = this.props
        this.instance.setOptions(config)
      } else {
        for (let prop in this.props) {
          const methodName = `set${caplize(prop)}`

          if (this.instance[methodName]) {
            this.instance[methodName](this.props[prop])
          }
        }
      }
    }

    return null
  }

  removeInstance() {
    if (this.instance) {
      if (this.instance.setMap) {
        this.instance.setMap(null)
      }
    }
  }

  componentWillUnmount() {
    this.removeInstance()
  }
})

export default withUI
