import withUI from './withUI'

export default withUI('ui/overlay/SimpleMarker')(({props, instance}) => {
  const {children} = props
  children && children(instance)

  return null
})
