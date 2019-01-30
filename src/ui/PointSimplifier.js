import withUI from './withUI'

export default withUI('ui/misc/PointSimplifier')(({props, instance}) => {
  const {children} = props
  children && children(instance)

  return null
})
