import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class InteractionLearningIcon extends Component {
  render() {
    const {width = 69, height = 70} = this.props;
    return (
      <svg width={width + "px"} height={height + "px"} viewBox="0 0 69 70">
        <defs></defs>
        <g id="06---UI-Kit" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="icons---illustrated" transform="translate(-404.000000, -139.000000)">
            <g id="Atoms-/-icons-/-illustrated-/-Enroll" transform="translate(396.000000, 132.000000)">
              <rect id="Rectangle-20" fill="#F4FAFA" fillRule="evenodd" x="9" y="52" width="66" height="24"></rect>
              <g id="005-video-player-1" strokeWidth="1" fillRule="evenodd" transform="translate(9.000000, 8.000000)">
                <path d="M26.6387692,31.8462479 C26.2449231,31.626245 26,31.2062394 26,30.7499833 L26,13.2497492 C26,12.7934931 26.2449231,12.3734875 26.6375385,12.1534845 C27.0338462,11.9347316 27.5101538,11.9509818 27.8916923,12.1947351 L41.4301538,20.9448521 C41.7846154,21.1748552 42,21.5723605 42,21.9998662 C42,22.4273719 41.7846154,22.8248773 41.4301538,23.0548803 L27.8916923,31.8049974 C27.6898462,31.9337491 27.4609231,32 27.2307692,32 C27.0276923,32 26.8233846,31.9487493 26.6387692,31.8462479 Z" id="Shape" fill="#FF7F45" fillRule="nonzero"></path>
                <path d="M36.4802313,17.7456406 C37.4416582,18.3670257 39.0916324,19.4334295 41.4301538,20.9448521 C41.7846154,21.1748552 42,21.5723605 42,21.9998662 C42,22.4273719 41.7846154,22.8248773 41.4301538,23.0548803 L27.8916923,31.8049974 C27.6898462,31.9337491 27.4609231,32 27.2307692,32 C27.0276923,32 26.8233846,31.9487493 26.6387692,31.8462479 C26.2449231,31.626245 26,31.2062394 26,30.7499833 L26,13.2497492 C26,12.7934931 26.2449231,12.3734875 26.6375385,12.1534845 C27.0338462,11.9347316 27.5101538,11.9509818 27.8916923,12.1947351 C29.7570917,13.4003716 31.1561413,14.3045989 32.088841,14.9074172" id="Shape" stroke="#404F54" strokeWidth="2" strokeLinecap="round" fillRule="nonzero"></path>
                <path d="M67,24.8808067 L67,66 C67,67.1045695 66.1045695,68 65,68 L2,68 C0.8954305,68 1.3527075e-16,67.1045695 0,66 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 L65,0 C66.1045695,-2.02906125e-16 67,0.8954305 67,2 L67,12.0719494" id="Rectangle-19" stroke="#404F54" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M1,45 L58.1428917,45" id="Path-2" stroke="#404F54" strokeWidth="2" strokeLinecap="round"></path>
                <path d="M20,57 L58.1428917,57 C58.6951765,57 59.1428917,56.5522847 59.1428917,56 C59.1428917,55.4477153 58.6951765,55 58.1428917,55 L20,55 C19.4477153,55 19,55.4477153 19,56 C19,56.5522847 19.4477153,57 20,57 Z" id="Path-2-Copy" fill="#1CABA0" fillRule="nonzero"></path>
              </g>
              <path d="M34,59 L34,67.9235183" id="Path-19" stroke="#404F54" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M20,59 L20,67.9235183" id="Path-19-Copy" stroke="#404F54" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M16,59 L16,67.9235183" id="Path-19-Copy-2" stroke="#404F54" strokeWidth="2" strokeLinecap="round"></path>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

InteractionLearningIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};


export default cssModules(InteractionLearningIcon, styles);