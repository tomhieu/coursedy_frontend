import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CourseLessonlIcon extends Component {
  render() {
    const { width = 20, height = 20, fillColor = '#B3BDBC' } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 20 20" version="1.1">
        <defs />
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-icons-/-Dental-/-Small-/-#09" transform="translate(-2.000000, -2.000000)" fill="#626F6E" fillRule="nonzero">
            <g id="010-computer-1" transform="translate(2.000000, 2.000000)">
              <path d="M17.7795276,0 L2.22047244,0 C0.996062992,0 0,0.996062992 0,2.22047244 L0,14.1023622 C0,15.3267717 0.996062992,16.3228346 2.22047244,16.3228346 L8.0511811,16.3228346 C7.98425197,16.976378 7.53937008,17.7913386 5.38976378,18.9527559 C5.16535433,19.0748031 5.0511811,19.3307087 5.11417323,19.5787402 C5.17716535,19.8267717 5.3976378,20 5.65354331,20 L14.3464567,20 C14.6023622,20 14.8228346,19.8267717 14.8858268,19.5787402 C14.9488189,19.3307087 14.8346457,19.0748031 14.6102362,18.9527559 C12.4566929,17.7913386 12.015748,16.976378 11.9488189,16.3228346 L17.7795276,16.3228346 C19.003937,16.3228346 20,15.3267717 20,14.1023622 L20,2.22047244 C20,0.996062992 19.003937,0 17.7795276,0 Z M1.11023622,2.22047244 C1.11023622,1.60629921 1.61023622,1.11023622 2.22047244,1.11023622 L17.7755906,1.11023622 C18.3897638,1.11023622 18.8858268,1.61023622 18.8858268,2.22047244 L18.8858268,11.6062992 L1.11023622,11.6062992 L1.11023622,2.22047244 Z M12.4409449,18.8897638 L7.55905512,18.8897638 C8.79527559,17.9330709 9.11417323,17.0984252 9.16141732,16.3267717 L10.8346457,16.3267717 C10.8858268,17.0984252 11.2047244,17.9330709 12.4409449,18.8897638 Z M18.8897638,14.1023622 C18.8897638,14.7165354 18.3897638,15.2125984 17.7795276,15.2125984 L2.22047244,15.2125984 C1.60629921,15.2125984 1.11023622,14.7125984 1.11023622,14.1023622 L1.11023622,12.7165354 L18.8897638,12.7165354 L18.8897638,14.1023622 Z" id="Shape" />
              <path d="M11.0984252,13.4133858 L8.9015748,13.4133858 C8.59448819,13.4133858 8.34645669,13.6614173 8.34645669,13.9685039 C8.34645669,14.2716535 8.59448819,14.523622 8.9015748,14.523622 L11.0984252,14.523622 C11.4055118,14.523622 11.6535433,14.2755906 11.6535433,13.9685039 C11.6535433,13.6614173 11.4055118,13.4133858 11.0984252,13.4133858 Z" id="Shape" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

CourseLessonlIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(CourseLessonlIcon, styles);
