import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class LoadingIcon extends Component {
  render() {
    const { width = 50, height = 50, isActive } = this.props;
    let { fillColor = '#B3BDBC' } = this.props;
    if (isActive) {
      fillColor = '#55ACEE';
    }
    return (
      <svg width={`${width}px`}  height={`${height}px`} viewBox="25 25 50 50" version="1.1">
        <circle className="path" cx="50" cy="50" r="20" fill="none" />
      </svg>
    );
  }
}

LoadingIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string,
  isActive: React.PropTypes.bool
};


export default cssModules(LoadingIcon, styles);
