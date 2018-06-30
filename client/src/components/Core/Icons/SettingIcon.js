import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class SettingIcon extends Component {
  render() {
    const {width = 20, height = 20, fillColor = '#B3BDBC'} = this.props;
    return (
      <svg width={width + 'px'} height={height + 'px'} viewBox="0 0 20 20" version="1.1">
        <defs>
          <path d="M19.1593316,12.98 C19.1993316,12.66 19.2293316,12.34 19.2293316,12 C19.2293316,11.66 19.1993316,11.34 19.1593316,11.02 L21.2693316,9.37 C21.4593316,9.22 21.5093316,8.95 21.3893316,8.73 L19.3893316,5.27 C19.2693316,5.05 18.9993316,4.97 18.7793316,5.05 L16.2893316,6.05 C15.7693316,5.65 15.2093316,5.32 14.5993316,5.07 L14.2193316,2.42 C14.1893316,2.18 13.9793316,2 13.7293316,2 L9.7293316,2 C9.4793316,2 9.2693316,2.18 9.2393316,2.42 L8.8593316,5.07 C8.2493316,5.32 7.6893316,5.66 7.1693316,6.05 L4.6793316,5.05 C4.4493316,4.96 4.1893316,5.05 4.0693316,5.27 L2.0693316,8.73 C1.9393316,8.95 1.9993316,9.22 2.1893316,9.37 L4.2993316,11.02 C4.2593316,11.34 4.2293316,11.67 4.2293316,12 C4.2293316,12.33 4.2593316,12.66 4.2993316,12.98 L2.1893316,14.63 C1.9993316,14.78 1.9493316,15.05 2.0693316,15.27 L4.0693316,18.73 C4.1893316,18.95 4.4593316,19.03 4.6793316,18.95 L7.1693316,17.95 C7.6893316,18.35 8.2493316,18.68 8.8593316,18.93 L9.2393316,21.58 C9.2693316,21.82 9.4793316,22 9.7293316,22 L13.7293316,22 C13.9793316,22 14.1893316,21.82 14.2193316,21.58 L14.5993316,18.93 C15.2093316,18.68 15.7693316,18.34 16.2893316,17.95 L18.7793316,18.95 C19.0093316,19.04 19.2693316,18.95 19.3893316,18.73 L21.3893316,15.27 C21.5093316,15.05 21.4593316,14.78 21.2693316,14.63 L19.1593316,12.98 L19.1593316,12.98 Z M11.7293316,15.5 C9.7993316,15.5 8.2293316,13.93 8.2293316,12 C8.2293316,10.07 9.7993316,8.5 11.7293316,8.5 C13.6593316,8.5 15.2293316,10.07 15.2293316,12 C15.2293316,13.93 13.6593316,15.5 11.7293316,15.5 L11.7293316,15.5 Z" id="path-setting-icon"></path>
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/Setting" transform="translate(-2.000000, -2.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-setting-icon"></use>
            </mask>
            <use id="Shape" fillOpacity="1" fill={fillColor} xlinkHref="#path-setting-icon"></use>
          </g>
        </g>
      </svg>
    )
  }
}

SettingIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(SettingIcon, styles);