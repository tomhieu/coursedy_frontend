import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class AddCourseIcon extends Component {
  render() {
    const {width = 20, height = 20, fillColor = '#B3BDBC'} = this.props;
    return (
      <svg width={width + 'px'} height={height + 'px'} viewBox="0 0 20 20" version="1.1">
        <defs>
          <path d="M13,7 L11,7 L11,11 L7,11 L7,13 L11,13 L11,17 L13,17 L13,13 L17,13 L17,11 L13,11 L13,7 L13,7 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 L12,20 Z" id="path-add-course"></path>
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/Add" transform="translate(-2.000000, -2.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-add-course"></use>
            </mask>
            <use id="Mask" fillOpacity="1" fill={fillColor} xlinkHref="#path-add-course"></use>
          </g>
        </g>
      </svg>
    )
  }
}

AddCourseIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(AddCourseIcon, styles);