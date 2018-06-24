import styles from "./FlatButton.module.scss";
import {Component} from "react";
import * as React from "react";
import cssModules from 'react-css-modules';

class FlatButton extends Component {
  render() {
    const {label, secondary, onClick} = this.props;
    return (
      <button className={styles.flatBtn} type="button" onClick={onClick}>
        <div className={secondary ? styles.secondary : styles.primary}>
          {this.props.children}
          {
            label && label !== '' ? <span className={styles.flatLabel}>{label}</span> : null
          }
        </div>
      </button>
    )
  }
}

FlatButton.propTypes = {
  label: React.PropTypes.string,
  secondary: React.PropTypes.bool,
  onClick: React.PropTypes.func
}

export default cssModules(FlatButton, styles);