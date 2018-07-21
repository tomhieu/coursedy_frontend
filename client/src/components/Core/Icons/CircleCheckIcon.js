import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Icons.module.scss';

class CircleCheckIcon extends Component {
  render() {
    const {width = 100, height = 100, fillColor = '#50ca33', message} = this.props;
    const circleClasses = [styles.path, styles.circle];
    const pointsClasses = [styles.path, styles.check];
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <svg version="1.1" width={width} height={height} viewBox="0 0 130.2 130.2">
          <circle className={circleClasses.join(' ')} fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
          <polyline className={pointsClasses.join(' ')} fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>
        <p className={styles.success}>{message}</p>
      </div>
  )
  }
}

CircleCheckIcon.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  fillColor: React.PropTypes.string,
  message: React.PropTypes.string
};


export default cssModules(CircleCheckIcon, styles);