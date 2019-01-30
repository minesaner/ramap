import withProps from '../withProps'

const Geocoder = withProps(props => {
  const {children, ...config} = props
  const instance = new window.AMap.Geocoder(config)
  children && children(instance)

  return instance
})

Geocoder.displayName = 'AMap.Geocoder'

export default Geocoder
