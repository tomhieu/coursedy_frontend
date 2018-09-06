import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class SignOutIcon extends Component {
  render() {
    const { width = 20, height = 20, isActive } = this.props;
    const { fillColor = '#B3BDBC' } = this.props;

    return (
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 26 26"
        style={{ width: `${width}px`, height: `${height}px`, fill: fillColor }}
        xmlSpace="preserve"
      >
        <g>
          <path
            style={{ fill: fillColor }}
            d="M20.25,19.547V23c0,0.552-0.449,1-1,1h-14c-0.551,0-1-0.448-1-1V3c0-0.552,0.449-1,1-1h14
            c0.551,0,1,0.448,1,1v3.453l2,1.733V3c0-1.656-1.344-3-3-3h-14c-1.656,0-3,1.344-3,3v20c0,1.656,1.344,3,3,3h14
            c1.656,0,3-1.344,3-3v-5.187L20.25,19.547z"
          />
          <g>
            <path
              style={{ fill: fillColor }}
              d="M16.25,19.5c0,0-1,0.281-1-1c0-0.29,0-1.257,0-2.5h-6c-0.552,0-1-0.449-1-1v-4c0-0.551,0.448-1,1-1
              h6c0-1.196,0-2.155,0-2.531c0-1.344,1-0.969,1-0.969l7.5,6.5L16.25,19.5z"
            />
          </g>
        </g>
      </svg>
    );
  }
}

SignOutIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string,
  isActive: React.PropTypes.bool
};


export default cssModules(SignOutIcon, styles);
