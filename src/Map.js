import React from 'react'
import {Provider} from './ContextMap'
import {loadMapScript} from './loadScript'

const mapStyle = {
  width: '100%',
  height: '100%',
  minHeight: '150px',
  position: 'relative',
}
const loadingStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const Loading = () => <p style={loadingStyle}><span>地图加载中...</span></p>

class Map extends React.Component {
  instance = null
  mapContainerRef = React.createRef()
  state = {scriptLoaded: false}
  containerStyle = this.props.height !== undefined ? {
    ...mapStyle,
    height: this.props.height,
    overflow: 'hidden',
  } : mapStyle

  timeout = null

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.state.scriptLoaded && nextState.scriptLoaded) {
  //     return true
  //   }

  //   for (let prop in nextProps) {
  //     const methodName = `set${caplize(prop)}`

  //     if (this.instance[methodName]) {
  //       this.instance[methodName](this.props[prop])
  //     }
  //   }
  //   return false
  // }

  componentDidMount() {
    const {v, apiKey: key, loading, height, ...mapConfig} = this.props
    loadMapScript({
      v,
      key,
    }).then(() => {
      this.initMap(mapConfig)
      this.setState({scriptLoaded: true})
    })

    this.fitWidth()
  }

  render() {
    const {scriptLoaded} = this.state

    return (
      <div style={this.containerStyle}>
        <div style={mapStyle} ref={this.mapContainerRef}>
          {
            !scriptLoaded && (this.props.loading || <Loading />)
          }
        </div>
        <div>
          {
            scriptLoaded && (
              <Provider value={this.instance}>
                {this.props.children}
              </Provider>
            )
          }
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    this.fitWidth()
  }

  initMap(config) {
    this.instance = new window.AMap.Map(this.mapContainerRef.current, config)
  }

  fitWidth() {
    window.clearTimeout(this.timeout)

    this.timeout = window.setTimeout(() => {
      const mapContainerElement = this.mapContainerRef.current
      const parentElement = mapContainerElement.parentElement.parentElement

      mapContainerElement.style.width = parentElement.offsetWidth + 'px'
    }, 350)
  }
}

export default Map
