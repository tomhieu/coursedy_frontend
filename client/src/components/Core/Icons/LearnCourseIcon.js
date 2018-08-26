import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class LearnCourseIcon extends Component {
  render() {
    const { width = 74, height = 77 } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 74 77" version="1.1">
        <defs />
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-icons/illustrated/Control-Copy" transform="translate(-4.000000, -3.000000)">
            <g id="Group" transform="translate(4.000000, 3.000000)">
              <path d="M3.82758621,0 C1.73006897,0 0,1.73006897 0,3.82758621 L0,72.7241379 C0,74.8216552 1.73006897,76.5517241 3.82758621,76.5517241 L70.1724138,76.5517241 C72.269931,76.5517241 74,74.8216552 74,72.7241379 L74,3.82758621 C74,1.73006897 72.269931,0 70.1724138,0 L3.82758621,0 Z M3.82758621,2.55172414 L70.1724138,2.55172414 C70.9022069,2.55172414 71.4482759,3.0977931 71.4482759,3.82758621 L71.4482759,72.7241379 C71.4482759,73.453931 70.9022069,74 70.1724138,74 L3.82758621,74 C3.0977931,74 2.55172414,73.453931 2.55172414,72.7241379 L2.55172414,3.82758621 C2.55172414,3.0977931 3.0977931,2.55172414 3.82758621,2.55172414 Z" id="Combined-Shape" fill="#404F54" fillRule="nonzero" />
              <path d="M22.5,29 L53,29 L53,48 L22.5,48 C17.2532949,48 13,43.7467051 13,38.5 L13,38.5 C13,33.2532949 17.2532949,29 22.5,29 Z" id="Rectangle" fill="#F4FAFA" />
              <path d="M22.5,29 L53,29 L53,48 L22.5,48 C17.2532949,48 13,43.7467051 13,38.5 L13,38.5 C13,33.2532949 17.2532949,29 22.5,29 Z" id="Rectangle" stroke="#404F54" strokeWidth="2" strokeLinecap="round" />
              <circle id="Oval-3" fill="#FF7F45" cx="51" cy="38" r="11" />
              <path d="M55.3601963,27.8979991 C54.0232981,27.320191 52.5490414,27 51,27 C44.9248678,27 40,31.9248678 40,38 C40,44.0751322 44.9248678,49 51,49 C57.0751322,49 62,44.0751322 62,38 C62,35.534603 61.1889328,33.2586409 59.8190679,31.4243831" id="Oval-3" stroke="#404F54" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

LearnCourseIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};


export default cssModules(LearnCourseIcon, styles);
