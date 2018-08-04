import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class LessonIcon extends Component {
  render() {
    const {width = 20, height = 20, fillColor = '#000000'} = this.props;
    return (
      <svg width={width + "px"} height={height + "px"} viewBox="0 0 20 20" version="1.1">
        <defs>
          <path d="M10,16.5 L16,12 L10,7.5 L10,16.5 L10,16.5 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z" id="path-lesson-icon"></path>
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/Play" transform="translate(-2.000000, -2.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-lesson-icon"></use>
            </mask>
            <use id="Mask" fillOpacity="0.7" fill={fillColor} xlinkHref="#path-lesson-icon"></use>
          </g>
        </g>
      </svg>
    )
  }
}

LessonIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(LessonIcon, styles);