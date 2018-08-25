import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CourseFollowIcon extends Component {
  render() {
    const {width = 22, height = 20, fillColor = '#B3BDBC'} = this.props;
    return (

      <svg width={width + 'px'} height={height + 'px'} viewBox="0 0 16 14" version="1.1">
        <defs>
          <path d="M12.0069876,18.35 L10.8459744,17.389673 C6.72237579,13.9921526 4,11.7513896 4,9.0013624 C4,6.76059946 5.937691,5 8.40384319,5 C9.79705903,5 11.134226,5.58929155 12.0069876,6.52051771 C12.8797493,5.58929155 14.2169162,5 15.610132,5 C18.0762842,5 20.0139752,6.76059946 20.0139752,9.0013624 C20.0139752,11.7513896 17.2915994,13.9921526 13.1680008,17.3969482 L12.0069876,18.35 L12.0069876,18.35 Z" id="path-course-follow"></path>
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/Heart" transform="translate(-4.000000, -5.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-course-follow"></use>
            </mask>
            <use id="Shape" fill={fillColor} xlinkHref="#path-course-follow"></use>
          </g>
        </g>
      </svg>
    )
  }
}

CourseFollowIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(CourseFollowIcon, styles);