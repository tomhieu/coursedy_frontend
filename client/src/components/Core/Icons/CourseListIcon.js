import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CourseListIcon extends Component {
  render() {
    const { width = 22, height = 18, fillColor = '#B3BDBC' } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 22 18" version="1.1">
        <defs>
          <path d="M5,13.18 L5,17.18 L12,21 L19,17.18 L19,13.18 L12,17 L5,13.18 L5,13.18 Z M12,3 L1,9 L12,15 L21,10.09 L21,17 L23,17 L23,9 L12,3 L12,3 Z" id="path-course-list" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/-School" transform="translate(-1.000000, -3.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-course-list" />
            </mask>
            <use id="Mask" fillOpacity="1" fill={fillColor} xlinkHref="#path-course-list" />
          </g>
        </g>
      </svg>
    );
  }
}

CourseListIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(CourseListIcon, styles);
