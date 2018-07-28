import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class FacebookIcon extends Component {
  render() {
    const {width = 38, height = 38} = this.props;
    return (
      <svg width={width + "px"} height={height + "px"} viewBox="0 0 38 38" version="1.1">
        <defs>
          <polygon id="path-1" points="37.7857843 0.212025243 37.7857843 37.6309573 0.000111764706 37.6309573 0.000111764706 0.212025243"></polygon>
        </defs>
        <g id="02---Pages" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Course---Detail-View" transform="translate(-1038.000000, -987.000000)">
            <g id="Share-options" transform="translate(1037.000000, 950.000000)">
              <g id="Facebook" transform="translate(1.000000, 37.000000)">
                <g id="Group-3" transform="translate(0.000000, 0.157165)">
                  <mask id="mask-2" fill="white">
                    <use xlinkHref="#path-1"></use>
                  </mask>
                  <g id="Clip-2"></g>
                  <path d="M37.7858961,18.9213068 C37.7858961,29.2550932 29.3275431,37.6309573 18.8928176,37.6309573 C8.45809216,37.6309573 0.000111764706,29.2550932 0.000111764706,18.9213068 C0.000111764706,8.58825825 8.45809216,0.212025243 18.8928176,0.212025243 C29.3275431,0.212025243 37.7858961,8.58825825 37.7858961,18.9213068" id="Fill-1" fill="#1F5790" mask="url(#mask-2)"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

FacebookIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default cssModules(FacebookIcon, styles);