import withUI from './withUI'

export default withUI('ui/misc/PathSimplifier')(({props, instance}) => {
  const {children} = props
  children && children(instance)

  return null
})
