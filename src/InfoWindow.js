import withProps from './withProps'

export default withProps(props => {
  const {children, ...config} = props
  const instance = new window.AMap.InfoWindow(config)
  children && children(instance)

  return instance
})
