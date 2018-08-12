import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CoursedyShortIcon extends Component {
  render() {
    const {width = 22, height = 18, fillColor = '#B3BDBC'} = this.props;
    return (
      <svg width={width} height={height} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 120">
        <defs id="SvgjsDefs1222"></defs>
        <g id="SvgjsG1223" featurekey="root" fill="transparent" transform="matrix(1,0,0,1,NaN,NaN)"></g>
        <g id="SvgjsG1224" featurekey="text4" fill={fillColor} transform="matrix(7.081699600880431,0,0,7.081699600880431,1.4919732034672357,-62.408915581655805)">
          <path d="M16.885 23.066405 q-0.703125 0.29296875 -1.416015625 0.52734375 t-1.4746 0.40527 t-1.6064 0.25879 t-1.8115 0.087891 q-2.05078125 0 -3.774414063 -0.439453125 t-2.9688 -1.3232 t-1.9385 -2.207 t-0.69336 -3.0908 t0.69336 -3.0908 t1.9385 -2.207 t2.9688 -1.3232 t3.7744 -0.43945 q0.966796875 0 1.811523438 0.087890625 t1.6064 0.25879 t1.4746 0.40527 t1.416 0.52734 l0 3.2617 q-0.556640625 -0.302734375 -1.171875 -0.6005859375 t-1.3574 -0.53711 t-1.6309 -0.39063 t-2.002 -0.15137 q-1.708984375 0 -2.836914063 0.3515625 t-1.8018 0.9375 t-0.94727 1.3428 t-0.27344 1.5674 q0 0.537109375 0.1171875 1.059570313 t0.39063 0.98633 t0.71289 0.85449 t1.0938 0.67383 t1.5283 0.44434 t2.0166 0.16113 q1.11328125 0 2.001953125 -0.1416015625 t1.6309 -0.37598 t1.3574 -0.53223 t1.1719 -0.61035 l0 3.2617 l0 0 z"></path>
        </g>
      </svg>
    )
  }
}

CoursedyShortIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string
};


export default cssModules(CoursedyShortIcon, styles);