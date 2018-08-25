import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CheckIcon extends Component {
  render() {
    const { width = 22, height = 17, isActive } = this.props;
    let { fillColor = '#B3BDBC' } = this.props;
    if (isActive) {
      fillColor = '#55ACEE';
    }
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 22 17" version="1.1">
        <defs />
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Checkmark/blue" transform="translate(-4.000000, -10.000000)" fill={fillColor}>
            <g id="Group" transform="translate(14.620294, 16.122347) rotate(-315.000000) translate(-14.620294, -16.122347) translate(8.620294, 6.122347)">
              <path d="M8.62746211,15.7535173 L8.62746211,-0.000468973417 L11.6274621,-0.000468973417 L11.6274621,19.128869 L8.62746211,19.128869 L8.62746211,18.7535173 L0.517864081,18.7535173 L0.517864081,15.7535173 L8.62746211,15.7535173 Z" id="Combined-Shape" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

CheckIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string,
  isActive: React.PropTypes.bool
};


export default cssModules(CheckIcon, styles);
