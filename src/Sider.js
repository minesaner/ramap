import React from 'react'

const baseStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  background: 'rgb(255, 255, 255)',
  transition: 'transform .3s ease-out',
  overflow: 'auto',
}
const arrowWidth = 16
const arrowHeight = 64
const arrowStyle = {
  position: 'absolute',
  top: '50%',
  left: -arrowWidth,
  width: arrowWidth,
  height: arrowHeight,
  borderRadius: '4px 0 0 4px',
  background: '#1890ff',
  color: '#fff',
  fontSize: 16,
  lineHeight: arrowHeight + 'px',
  textAlign: 'center',
  cursor: 'pointer',
  transform: 'translateY(-50%)',
}
class Sider extends React.Component {
  showStyle = {
    ...baseStyle,
    width: this.props.width,
    transform: 'translateX(0)',
  }
  hideStyle = {
    ...baseStyle,
    width: this.props.width,
    transform: `translateX(${this.props.width}px)`,
  }

  state = {collapsed: false}

  render() {
    const {collapsed} = this.state
    return (
      <div style={collapsed ? this.hideStyle : this.showStyle}>
        {this.props.children}
        <div style={arrowStyle} onClick={this.handleClick}>
          {collapsed ? '‹' : '›'}
        </div>
      </div>
    )
  }

  handleClick = () => {
    this.setState({collapsed: !this.state.collapsed})
  }
}

export default Sider
