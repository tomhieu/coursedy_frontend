import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './PrimaryButton.module.scss';
import LoadingMask from '../../../containers/LoadingMask/LoadingMask';


class PrimaryButton extends Component {
  render() {
    const {
      type, callback, title, isPrimary = true, round = false,
      disabled = false, line = true, customClasses, iconButton = false, isSmallButton = false,
      placeholderId = ""
    } = this.props;
    // build list classes
    const classNames = [styles.button];
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

    if (isSmallButton) {
      classNames.push(styles.small);
    }

    return (
      type === 'submit'
        ? (
          <button type="submit" className={classNames.join(' ')} disabled={disabled ? "disabled" : ""}>
            <LoadingMask placeholderId={placeholderId} normalPlaceholder={false} buttonPlaceholder={true}>
              <span>
                { iconButton ? this.props.children : null }
                {title}
              </span>
            </LoadingMask>
          </button>

        )
        : (
          <button type="button" className={classNames.join(' ')} onClick={callback} disabled={disabled}>
            {
            iconButton ? this.props.children : null
          }
            {title}
          </button>
        )
    );
  }
}

PrimaryButton.propTypes = {
  type: React.PropTypes.string,
  callback: React.PropTypes.func,
  title: React.PropTypes.string,
  isPrimary: React.PropTypes.bool,
  round: React.PropTypes.bool,
  line: React.PropTypes.bool,
  customClasses: React.PropTypes.string,
  iconButton: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  isSmallButton: React.PropTypes.bool,
  placeholderId: React.PropTypes.string,
};

export default cssModules(PrimaryButton, styles);
