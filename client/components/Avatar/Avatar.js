import React from 'react';
import PropTypes from 'prop-types';
import ColorHash from 'color-hash';
import './avatar.scss';

export default class Avatar extends React.Component {
  selectColor = name => {
    const colorHash = new ColorHash({ saturation: 0.55, lightness: 0.73});
    return colorHash.hex(name);
  }
  getStyle = () => {
    const {name, imageUrl} = this.props;
    const containerSize = this.props.size || 32;
    const borderRadius = this.props.borderRadius || '50%';
    const fontSize = Math.floor(containerSize / 2.1);
    const lineHeight = fontSize;
    const paddingTop = Math.floor((containerSize - fontSize) / 2);
    const style = {
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      paddingTop: `${paddingTop}px`,
      height: `${containerSize}px`,
      width: `${containerSize}px`,
      borderRadius
    };
    if(!imageUrl) {
      const color = this.selectColor(name);
      style.backgroundColor = color;
    } else {
      style.backgroundImage = `url("${imageUrl}")`;
    }
    return style;
  }
  renderIcon() {
    const {imageUrl, name} = this.props;
    return imageUrl
      ? null
      : <div className="avatar__generated">{(name || '-').toUpperCase().slice(0, 1)}</div>;
  }
  render() {
    const {className = '', onClick} = this.props;
    return (
      <div onClick={onClick} className={`avatar${className ? ` ${className}` : ''}`} style={this.getStyle()}>
        {this.renderIcon()}
      </div>
    );
  }
}

Avatar.propTypes = {
  size: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  borderRadius: PropTypes.string
};
