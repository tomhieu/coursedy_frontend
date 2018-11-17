import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './CoursedyWarning.module.scss';
import WarningIcon from '../Icons/WarningIcon';

/**
 * @Course group item template 2
 * @Use for CoursePage
 */
class CoursedyWarning extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {message} = this.props;
    return (
      <div className={styles.warningContainer}>
        <WarningIcon width={14} height={12} fillColor="#FDC100"></WarningIcon>
        <span className={styles.message}>{message}</span>
      </div>
    );
  }
}

CoursedyWarning.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CoursedyWarning.propTypes = {
  message: React.PropTypes.string.isRequired
};

export default cssModules(CoursedyWarning, styles);
