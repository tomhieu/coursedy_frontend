import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class RefreshIcon extends Component {
  render() {
    const { width = 16, height = 22, fillColor = '#B3BDBC' } = this.props;
    return (

      <svg width={width + "px"} height={height + "px"} viewBox="0 0 16 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path d="M12,4 L12,1 L8,5 L12,9 L12,6 C15.31,6 18,8.69 18,12 C18,13.01 17.75,13.97 17.3,14.8 L18.76,16.26 C19.54,15.03 20,13.57 20,12 C20,7.58 16.42,4 12,4 L12,4 Z M12,18 C8.69,18 6,15.31 6,12 C6,10.99 6.25,10.03 6.7,9.2 L5.24,7.74 C4.46,8.97 4,10.43 4,12 C4,16.42 7.58,20 12,20 L12,23 L16,19 L12,15 L12,18 L12,18 Z" id="path-refresh-icon"></path>
        </defs>
        <g id="06---UI-Kit" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="icons---system" transform="translate(-670.000000, -149.000000)">
            <g id="Atoms-/-Icon/System/Sync" transform="translate(666.000000, 148.000000)">
              <mask id="mask-refresh-icon" fill="white">
                <use xlinkHref="#path-refresh-icon"></use>
              </mask>
              <use id="Mask" fill={fillColor} fillRule="evenodd" xlinkHref="#path-refresh-icon"></use>
              <g id="Atoms-/-Brand-/-Color/Gray_medium" mask="url(#mask-refresh-icon)" fill={fillColor} fillRule="evenodd">
                <rect id="Rectangle-Copy-2" x="0" y="0" width="24" height="24"></rect>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

RefreshIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(RefreshIcon, styles);
