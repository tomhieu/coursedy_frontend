import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CourseHistoryIcon extends Component {
  render() {
    const { width = 22, height = 22, fillColor = '#B3BDBC' } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 17 14" version="1.1">
        <defs>
          <path d="M4,14 L8,14 L8,10 L4,10 L4,14 L4,14 Z M4,19 L8,19 L8,15 L4,15 L4,19 L4,19 Z M4,9 L8,9 L8,5 L4,5 L4,9 L4,9 Z M9,14 L21,14 L21,10 L9,10 L9,14 L9,14 Z M9,19 L21,19 L21,15 L9,15 L9,19 L9,19 Z M9,5 L9,9 L21,9 L21,5 L9,5 L9,5 Z" id="path-course-list" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/-View-list" transform="translate(-4.000000, -5.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-course-list" />
            </mask>
            <use id="Mask" fillOpacity="0.7" fill={fillColor} xlinkHref="#path-course-list" />
          </g>
        </g>
      </svg>
    );
  }
}

CourseHistoryIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(CourseHistoryIcon, styles);
