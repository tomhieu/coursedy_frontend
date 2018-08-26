import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class UserProfileIcon extends Component {
  render() {
    const { width = 16, height = 16, fillColor = '#B3BDBC' } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 16 16" version="1.1">
        <defs>
          <path d="M12,4 C9.79,4 8,5.79 8,8 C8,10.21 9.79,12 12,12 C14.21,12 16,10.21 16,8 C16,5.79 14.21,4 12,4 L12,4 Z M12,14 C9.33,14 4,15.34 4,18 L4,20 L20,20 L20,18 C20,15.33 14.67,14 12,14 L12,14 Z" id="path-user-profile" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/User" transform="translate(-4.000000, -4.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-user-profile" />
            </mask>
            <use id="Shape" fillOpacity="1" fill={fillColor} xlinkHref="#path-user-profile" />
          </g>
        </g>
      </svg>
    );
  }
}

UserProfileIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(UserProfileIcon, styles);
