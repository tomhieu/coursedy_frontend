import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CommentIcon extends Component {
  render() {
    const { width = 18, height = 14, fillColor = '#B3BDBC' } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 18 14" version="1.1">
        <defs>
          <path d="M11,11.16 L11,19 L3,19 L3,11.048 C3,5.672 8.14285714,5 8.14285714,5 L8.82857143,6.568 C8.82857143,6.568 6.54285714,6.904 6.08571429,8.696 C5.62857143,10.04 6.54285714,11.16 6.54285714,11.16 L11,11.16 Z M21,11.16 L21,19 L13,19 L13,11.048 C13,5.672 18.1428571,5 18.1428571,5 L18.8285714,6.568 C18.8285714,6.568 16.5428571,6.904 16.0857143,8.696 C15.6285714,10.04 16.5428571,11.16 16.5428571,11.16 L21,11.16 Z" id="path-comment-icon" />
        </defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-Icon/System/Quote" transform="translate(-3.000000, -5.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-comment-icon" />
            </mask>
            <use id="Quote" fill={fillColor} fillRule="nonzero" xlinkHref="#path-comment-icon" />
          </g>
        </g>
      </svg>
    );
  }
}

CommentIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(CommentIcon, styles);
