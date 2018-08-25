import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CheckCircleIcon extends Component {
  render() {
    const { width = 22, height = 22, fillColor = '#888888' } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 22 22" version="1.1">
        <defs>
          <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M9.49933333,14.6253333 L6.44133333,11.5673333 L5.4,12.6013333 L9.49933333,16.7006667 L18.2993333,7.90066667 L17.2653333,6.86666667 L9.49933333,14.6253333 Z" id="path-check-circle" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/-Check" transform="translate(-1.000000, -1.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-check-circle" />
            </mask>
            <use id="Mask" fill={fillColor} fillRule="nonzero" xlinkHref="#path-check-circle" />
          </g>
        </g>
      </svg>
    );
  }
}

CheckCircleIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(CheckCircleIcon, styles);
