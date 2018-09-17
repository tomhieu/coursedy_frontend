import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class WarningIcon extends Component {
  render() {
    const { width = 18, height = 16, fillColor = '#000000' } = this.props;
    return (
      <svg width={width + "px"} height={height + "px"} viewBox="0 0 18 16" version="1.1">
        <defs>
          <path d="M0,15.5454545 L18,15.5454545 L9,0 L0,15.5454545 L0,15.5454545 Z M9.81818182,13.0909091 L8.18181818,13.0909091 L8.18181818,11.4545455 L9.81818182,11.4545455 L9.81818182,13.0909091 L9.81818182,13.0909091 Z M9.81818182,9.81818182 L8.18181818,9.81818182 L8.18181818,6.54545455 L9.81818182,6.54545455 L9.81818182,9.81818182 L9.81818182,9.81818182 Z" id="path-warning-icon"></path>
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/-Warning" transform="translate(-3.000000, -4.000000)">
            <g id="Pallet/#3" transform="translate(3.000000, 4.000000)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-warning-icon"></use>
              </mask>
              <use id="Mask" fill={fillColor} xlinkHref="#path-warning-icon"></use>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

WarningIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(WarningIcon, styles);
