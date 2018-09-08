import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class MoreVertIcon extends Component {
  render() {
    const { width = 4, height = 16, fillColor = '#444444' } = this.props;
    return (

      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 4 16" version="1.1">
        <defs>
          <path d="M12,8 C13.1,8 14,7.1 14,6 C14,4.9 13.1,4 12,4 C10.9,4 10,4.9 10,6 C10,7.1 10.9,8 12,8 L12,8 Z M12,10 C10.9,10 10,10.9 10,12 C10,13.1 10.9,14 12,14 C13.1,14 14,13.1 14,12 C14,10.9 13.1,10 12,10 L12,10 Z M12,16 C10.9,16 10,16.9 10,18 C10,19.1 10.9,20 12,20 C13.1,20 14,19.1 14,18 C14,16.9 13.1,16 12,16 L12,16 Z" id="path-more-vert" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/-More-Vert" transform="translate(-10.000000, -4.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-more-vert" />
            </mask>
            <use id="Mask" fill={fillColor} xlinkHref="#path-more-vert" />
          </g>
        </g>
      </svg>
    );
  }
}

MoreVertIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(MoreVertIcon, styles);
