import withProps from '../withProps'

const ToolBar = withProps(props => {
  const {children, map, ...config} = props
  const instance = new window.AMap.ToolBar(config)
  map.addControl(instance)
  children && children(instance)

  return instance
})

ToolBar.displayName = 'AMap.ToolBar'

export default ToolBar
