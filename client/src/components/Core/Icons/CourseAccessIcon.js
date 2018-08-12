import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CourseAccessIcon extends Component {
  render() {
    const {width = 20, height = 20, fillColor = '#B3BDBC'} = this.props;
    return (
      <svg width={width + "px"} height={height + "px"} viewBox="0 0 20 20" version="1.1">
        <defs></defs>
        <g id="🛠--Symbols-&amp;-Components" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Atoms-/-icons-/-Dental-/-Small-/-#08" transform="translate(-2.000000, -2.000000)" fill="#626F6E" fillRule="nonzero">
            <g id="003-basketball" transform="translate(2.000000, 2.000000)">
              <path d="M10,0 C4.48425197,0 0,4.48425197 0,10 C0,15.515748 4.48425197,20 10,20 C15.515748,20 20,15.515748 20,10 C20,4.48425197 15.515748,0 10,0 Z M2.98031496,4.55511811 C4.10629921,6.00393701 4.72440945,7.71259843 4.83464567,9.44488189 L1.12992126,9.44488189 C1.24409449,7.61023622 1.91732283,5.92519685 2.98031496,4.55511811 Z M1.12992126,10.5551181 L4.83464567,10.5551181 C4.72440945,12.2874016 4.11023622,13.996063 2.98031496,15.4448819 C1.91732283,14.0787402 1.24409449,12.3897638 1.12992126,10.5551181 Z M9.44488189,18.8700787 C7.22047244,18.7322835 5.21653543,17.7755906 3.72834646,16.2952756 C5.09448819,14.6102362 5.83464567,12.5984252 5.9488189,10.5551181 L9.44488189,10.5551181 L9.44488189,18.8700787 Z M9.44488189,9.44488189 L5.9488189,9.44488189 C5.83464567,7.40551181 5.09448819,5.38976378 3.72834646,3.70866142 C5.21259843,2.22834646 7.22047244,1.26771654 9.44488189,1.12992126 L9.44488189,9.44488189 Z M18.8700787,9.44488189 L15.1692913,9.44488189 C15.2795276,7.71259843 15.8937008,6.00393701 17.019685,4.55511811 C18.0826772,5.92519685 18.7559055,7.60629921 18.8700787,9.44488189 Z M10.5551181,1.12992126 C12.7795276,1.26771654 14.7874016,2.22834646 16.2755906,3.70866142 C14.9094488,5.39370079 14.1692913,7.4015748 14.0551181,9.44488189 L10.5551181,9.44488189 L10.5551181,1.12992126 Z M10.5551181,18.8700787 L10.5551181,10.5551181 L14.0511811,10.5551181 C14.1653543,12.5944882 14.9055118,14.6102362 16.2716535,16.2913386 C14.7874016,17.7716535 12.7795276,18.7322835 10.5551181,18.8700787 Z M17.019685,15.4409449 C15.8937008,13.996063 15.2755906,12.2874016 15.1692913,10.5551181 L18.8700787,10.5551181 C18.7559055,12.3897638 18.0826772,14.0748031 17.019685,15.4409449 Z" id="Shape"></path>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

CourseAccessIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};

export default cssModules(CourseAccessIcon, styles);