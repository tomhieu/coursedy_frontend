import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CloseIcon extends Component {
  render() {
    const { width = 14, height = 14, isActive } = this.props;
    let { fillColor = '#B3BDBC' } = this.props;
    if (isActive) {
      fillColor = '#55ACEE';
    }
    return (

      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 14 14">
        <defs>
          <polygon id="path-close" points="14 1.41 12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/-Error" transform="translate(-5.000000, -5.000000)">
            <g id="Pallet/#3" transform="translate(5.000000, 5.000000)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-close" />
              </mask>
              <use id="Mask" fillOpacity="0.7" fill={fillColor} xlinkHref="#path-close" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

CloseIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string,
  isActive: React.PropTypes.bool
};


export default cssModules(CloseIcon, styles);
