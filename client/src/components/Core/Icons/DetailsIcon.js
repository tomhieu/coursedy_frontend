import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class DetailsIcon extends Component {
  render() {
    const { width = 18, height = 12, fillColor = '#B3BDBC' } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 18 12" version="1.1">
        <defs>
          <path d="M3,18 L21,18 L21,16 L3,16 L3,18 Z M3,13 L21,13 L21,11 L3,11 L3,13 Z M3,6 L3,8 L21,8 L21,6 L3,6 Z" id="path-details-icon" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/Menu" transform="translate(-3.000000, -6.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-details-icon" />
            </mask>
            <use id="Mask" fill={fillColor} fillRule="nonzero" xlinkHref="#path-details-icon" />
          </g>
        </g>
      </svg>
    );
  }
}

DetailsIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(DetailsIcon, styles);
