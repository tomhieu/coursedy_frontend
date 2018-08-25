import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class RightArrowIcon extends Component {
  render() {
    const {
      width = 8, height = 13, fillColor = '#B3BDBC', isLeftArrow = false
    } = this.props;
    const classNames = [];
    let pathName = 'path-right-arrow';
    if (isLeftArrow) {
      classNames.push(styles.leftArrow);
      pathName = 'path-left-arrow';
    }

    return (
      <svg width={`${width}px`} height={`${height}px`} className={classNames.join(' ')} viewBox="0 0 8 13" version="1.1">
        <defs>
          <polygon id={pathName} points="8 17.03125 12.58 12.25 8 7.46875 9.41 6 15.41 12.25 9.41 18.5" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/arrow-right" transform="translate(-8.000000, -6.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref={`#${pathName}`} />
            </mask>
            <use id="Shape" fill={fillColor} xlinkHref={`#${pathName}`} />
          </g>
        </g>
      </svg>
    );
  }
}

RightArrowIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string,
  isLeftArrow: React.PropTypes.bool
};

export default cssModules(RightArrowIcon, styles);
