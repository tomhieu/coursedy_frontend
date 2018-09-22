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
      <svg className={styles.loadingIcon} width={`${width}px`}  height={`${height}px`} viewBox="25 25 50 50" version="1.1">
        <g transform="rotate(0 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(30 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(60 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(120 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(150 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(210 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(240 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(300 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <g transform="rotate(330 50 50)">
          <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={fillColor}>
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
          </rect>
        </g>
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
