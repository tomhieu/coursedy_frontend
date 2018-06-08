import styles from "./PrimaryButton.module.scss";
import {Component} from "react";
import * as React from "react";
import cssModules from 'react-css-modules';

class PrimaryButton extends Component {
  render() {
    const {type, callback, title, isPrimary = true} = this.props;
    // build list classes
    const classNames = [styles.button];
    if (isPrimary) {
      classNames.push(styles.primary);
    } else {
      classNames.push(styles.round);
    }
    return (
      type === 'submit' ?
      <button type='submit' className={classNames.join(" ")}>
        {title}
      </button> :
        <button type='button' className={classNames.join(" ")} onClick={callback}>
          {title}
        </button>
    )
  }
}

PrimaryButton.propTypes = {
  type: React.PropTypes.string,
  callback: React.PropTypes.func,
  title: React.PropTypes.string,
  isPrimary: React.PropTypes.bool
}

export default cssModules(PrimaryButton, styles);