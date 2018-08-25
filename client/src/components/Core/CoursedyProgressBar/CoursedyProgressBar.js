import * as React from 'react';
import { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './CoursedyProgressBar.module.scss';

class CoursedyProgressBar extends Component {
  render() {
    const { progress } = this.props;

    const customStyles = {};
    if (progress) {
      customStyles.width = `${progress}%`;
    }

    return (
      <div className={styles.meter}>
        <span style={customStyles} />
      </div>
    );
  }
}


CoursedyProgressBar.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CoursedyProgressBar.propTypes = {
  progress: React.PropTypes.number.isRequired
};

export default cssModules(CoursedyProgressBar, styles);
