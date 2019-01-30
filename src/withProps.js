import React from 'react'
import withMap from './withMap'

function caplize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const withProps = processor => withMap(class extends React.Component {
  instance = null

  render() {
    if (!this.instance) {
      this.instance = processor(this.props)
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

export default withProps
