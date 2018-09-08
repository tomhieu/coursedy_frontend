import { Component } from 'react';
import * as React from 'react';
import cssModules from 'react-css-modules';
import styles from './PrimaryAnchor.module.scss';

class PrimaryAnchor extends Component {
  render() {
    const {
      title, isPrimary = true, round = false,
      line = true, customClasses, iconAnchor = false, isSmallAnchor = false
    } = this.props;
    // build list classes
    const classNames = [styles.anchor];
    if (isPrimary) {
      classNames.push(styles.primary);
    } else {
      classNames.push(styles.secondary);
    }

    if (round) {
      classNames.push(styles.round);
    } else {
      classNames.push(styles.radius);
    }

    if (line) {
      classNames.push(styles.line);
    } else {
      classNames.push(styles.filled);
    }

    // add custom classes
    if (customClasses) {
      classNames.push(customClasses);
    }

    if (isSmallAnchor) {
      classNames.push(styles.small);
    }

    return (
      <a className={classNames.join(' ')} href={this.props.href}>
        {
          iconAnchor ? this.props.children : null
        }
        {title}
      </a>
    );
  }
}

PrimaryAnchor.propTypes = {
  title: React.PropTypes.string,
  isPrimary: React.PropTypes.bool,
  round: React.PropTypes.bool,
  line: React.PropTypes.bool,
  customClasses: React.PropTypes.string,
  iconAnchor: React.PropTypes.bool,
  isSmallAnchor: React.PropTypes.bool
};

export default cssModules(PrimaryAnchor, styles);
