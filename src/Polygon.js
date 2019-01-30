import withProps from './withProps'

export default withProps(props => {
  const {children, ...config} = props
  const instance = new window.AMap.Polygon(config)
  children && children(instance)

  return instance
})
