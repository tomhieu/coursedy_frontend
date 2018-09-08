import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class ActiveCourseListIcon extends Component {
  render() {
    const { width = 24, height = 16, fillColor = '#B3BDBC' } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 24 16" version="1.1">
        <defs>
          <path d="M4,6 L22,6 L22,4 L4,4 C2.9,4 2,4.9 2,6 L2,17 L0,17 L0,20 L14,20 L14,17 L4,17 L4,6 L4,6 Z M23,8 L17,8 C16.45,8 16,8.45 16,9 L16,19 C16,19.55 16.45,20 17,20 L23,20 C23.55,20 24,19.55 24,19 L24,9 C24,8.45 23.55,8 23,8 L23,8 Z M22,17 L18,17 L18,10 L22,10 L22,17 L22,17 Z" id="path-active-course-list" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/Device" transform="translate(0.000000, -4.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-active-course-list" />
            </mask>
            <use id="Shape" fillOpacity="1" fill={fillColor} xlinkHref="#path-active-course-list" />
          </g>
        </g>
      </svg>
    );
  }
}

ActiveCourseListIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(ActiveCourseListIcon, styles);
