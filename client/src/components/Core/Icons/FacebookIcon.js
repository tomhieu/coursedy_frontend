import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class FacebookIcon extends Component {
  render() {
    const { width = 38, height = 38 } = this.props;
    return (

      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 38 38" version="1.1">
        <defs>
          <polygon id="path-facebook" points="37.7857843 0.212025243 37.7857843 37.6309573 0.000111764706 37.6309573 0.000111764706 0.212025243" />
        </defs>
        <g id="02---Pages" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Course---Detail-View" transform="translate(-1038.000000, -987.000000)">
            <g id="Share-options" transform="translate(1037.000000, 950.000000)">
              <g id="Facebook" transform="translate(1.000000, 37.000000)">
                <g id="Group-3" transform="translate(0.000000, 0.157165)">
                  <mask id="mask-facebook" fill="white">
                    <use xlinkHref="#path-facebook" />
                  </mask>
                  <g id="Clip-2" />
                  <path d="M18.8928176,37.6309573 C8.45809216,37.6309573 0.000111764706,29.2550932 0.000111764706,18.9213068 C0.000111764706,8.58825825 8.45809216,0.212025243 18.8928176,0.212025243 C29.3275431,0.212025243 37.7858961,8.58825825 37.7858961,18.9213068 C37.7858961,29.2550932 29.3275431,37.6309573 18.8928176,37.6309573 Z" id="Fill-1" fill="#1F5790" mask="url(#mask-facebook)" />
                </g>
                <path d="M16.1100255,30.1682 L16.1100255,20.1823165 L12.7704961,20.1823165 L12.7704961,16.3184913 L16.1100255,16.3184913 L16.1100255,12.8623359 C16.1100255,12.8623359 16.2601627,8.84946214 20.1998686,8.3665301 L24.1768294,8.3665301 L24.1768294,11.933734 L21.6256137,11.933734 C21.6256137,11.933734 20.274751,11.8964718 20.1622412,13.4939476 L20.1622412,16.3550155 L24.1019471,16.3550155 L23.5766529,20.1823165 L20.1622412,20.1823165 L20.1581431,30.1741029 L16.1100255,30.1682 Z" id="Fill-4" fill="#FEFEFE" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

FacebookIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default cssModules(FacebookIcon, styles);
