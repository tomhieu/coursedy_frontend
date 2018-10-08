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
    let strokeWidth = 3;
    return (

      <svg width={`${width}px`}  height={`${height}px`} viewBox="0 0 38 38" stroke="#fff" version="1.1">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth={strokeWidth}>
            <circle cx="18" cy="18" r="18" stroke="#767676"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.5s"
                repeatCount="indefinite"/>
            </path>
          </g>
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
