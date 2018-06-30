import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class TrashIcon extends Component {
  render() {
    const {width = 14, height = 18, fillColor = '#B3BDBC'} = this.props;
    return (
      <svg width={width + "px"} height={height + "px"} viewBox="0 0 14 18" version="1.1">
        <defs>
          <path d="M6,19 C6,20.1 6.9,21 8,21 L16,21 C17.1,21 18,20.1 18,19 L18,7 L6,7 L6,19 L6,19 Z M19,4 L15.5,4 L14.5,3 L9.5,3 L8.5,4 L5,4 L5,6 L19,6 L19,4 L19,4 Z" id="path-trash-icon"></path>
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/Delete" transform="translate(-5.000000, -3.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-trash-icon"></use>
            </mask>
            <use id="Mask" fill={fillColor} xlinkHref="#path-trash-icon"></use>
          </g>
        </g>
      </svg>
    )
  }
}

TrashIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(TrashIcon, styles);