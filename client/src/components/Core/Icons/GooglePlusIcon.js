import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class GooglePlusIcon extends Component {
  render() {
    const {width = 38, height = 38} = this.props;
    return (
      <svg width={width + "px"} height={height + "px"} viewBox="0 0 38 38" version="1.1">
        <defs>
          <polygon id="path-google-plus" points="37.7857843 0.212025243 37.7857843 37.6309573 0.000111764706 37.6309573 0.000111764706 0.212025243"></polygon>
        </defs>
        <g id="02---Pages" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Course---Detail-View" transform="translate(-1092.000000, -987.000000)">
            <g id="Share-options" transform="translate(1037.000000, 950.000000)">
              <g id="G-Plus" transform="translate(55.000000, 37.000000)">
                <g id="Group-3" transform="translate(0.000000, 0.157165)">
                  <mask id="mask-google-plus" fill="white">
                    <use xlinkHref="#path-google-plus"></use>
                  </mask>
                  <g id="Clip-2"></g>
                  <path d="M37.7858961,18.9213068 C37.7858961,29.2550932 29.3275431,37.6309573 18.8928176,37.6309573 C8.45809216,37.6309573 0.000111764706,29.2550932 0.000111764706,18.9213068 C0.000111764706,8.58825825 8.45809216,0.212025243 18.8928176,0.212025243 C29.3275431,0.212025243 37.7858961,8.58825825 37.7858961,18.9213068" id="Fill-1" fill="#ED2F32" mask="url(#mask-google-plus)"></path>
                </g>
                <path d="M19.130802,27.2902718 C17.0739588,28.9360777 14.3979392,27.9794369 14.3979392,27.9794369 C10.8527627,26.8527184 12.1224098,24.2089515 12.1224098,24.2089515 C13.522449,21.9558835 17.1983902,22.4329126 17.1983902,22.4329126 L18.9046647,23.7326602 C21.0669392,25.5813786 19.130802,27.2902718 19.130802,27.2902718 M13.3916843,15.759301 C12.7937431,13.8825437 13.4114294,12.0168544 14.7716059,11.5911068 C16.1314098,11.1657282 17.7192137,12.3418835 18.3171549,14.2186408 C18.9158412,16.0953981 18.2985275,17.9610874 16.9376059,18.3857282 C15.5774294,18.8111068 13.9896255,17.6349515 13.3916843,15.759301 M18.511998,20.4823689 C18.511998,20.4823689 17.2866843,19.4858835 18.511998,18.4454951 C18.511998,18.4454951 20.3494098,17.3623107 20.7428216,15.585534 C20.7428216,15.585534 21.3117039,13.115534 19.0801353,11.6420194 L20.5245078,11.6420194 L22.2311549,10.6883301 L15.8423118,10.6883301 C15.8423118,10.6883301 12.3410961,10.7326019 11.2476647,13.5054951 C11.2476647,13.5054951 10.2410373,15.759301 11.7729588,17.6220388 C11.7729588,17.6220388 12.7356255,18.9660583 14.5730373,19.1390874 L15.8423118,19.0955534 C15.8423118,19.0955534 15.0547431,20.3097087 16.3240176,21.6946796 C16.3240176,21.6946796 12.0344882,21.7828544 10.6787824,23.472932 C10.6787824,23.472932 8.27211569,25.726 10.8535078,28.152835 C10.8535078,28.152835 12.6033706,29.7569515 16.8049784,29.1928544 C16.8049784,29.1928544 19.9112922,28.6726602 21.2681157,26.2026602 C21.2681157,26.2026602 22.4051353,23.9492233 20.4809196,22.1296505 C20.4809196,22.1296505 19.0801353,20.829165 18.511998,20.4823689" id="Fill-4" fill="#FEFEFE"></path>
                <polygon id="Fill-6" fill="#FEFEFE" points="30.6365314 14.0802175 28.0808451 14.0802175 28.0808451 11.5497126 26.9069431 11.5497126 26.9069431 14.0802175 24.3508843 14.0802175 24.3508843 15.2430913 26.9069431 15.2430913 26.9069431 17.774334 28.0808451 17.774334 28.0808451 15.2430913 30.6365314 15.2430913"></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

GooglePlusIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default cssModules(GooglePlusIcon, styles);