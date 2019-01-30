import withProps from './withProps'

export default withProps(props => {
  const {children, ...config} = props
  const instance = new window.AMap.Polyline(config)
  children && children(instance)

  return instance
})
