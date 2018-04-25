import {Component} from "react";
import styles from "./Chip.module.scss";
import * as React from "react";
import cssModules from 'react-css-modules';

class Chip extends Component {

  constructor(props) {
    super(props);
    this.state = {isActive: false};
  }

  onClickChip() {
    if (this.state.isActive) {
      this.setState({isActive: false});
    } else {
      this.setState({isActive: true});
    }
    if (this.props.onClickChip) {
      this.props.onClickChip();
    }
  }

  onBlurChip() {
    this.setState({isActive: false});
  }

  render() {
    const {onRequestDelete, label, show} = this.props;
    let classNames = styles.chipContainer + " chip-container";
    if (this.state.isActive) {
      classNames += "is-active";
    }
    return (
      <div className={classNames}>
        <a onClick={() => this.onClickChip()} onBlur={() => this.onBlurChip()} className={styles.chipText}>{label}</a>
        <a className={styles.deleteChipIcon + " delete-icon-chip"} onClick={onRequestDelete} role="button">
          <svg id="cx-icon-x_16x16" viewBox="0 0 16 16" width="100%" height="100%">
            <path d="M9.75 8L14 3.82a.53.53 0 0 0 0-.75l-1-.95a.54.54 0 0 0-.75 0L8 6.26 3.79 2.08a.54.54 0 0 0-.75 0l-.95.94a.53.53 0 0 0 0 .75L6.25 8 2 12.18a.53.53 0 0 0 0 .75l1 .95a.54.54 0 0 0 .75 0L8 9.74l4.21 4.19a.54.54 0 0 0 .75 0l.95-.94a.53.53 0 0 0 0-.75z" fillRule="evenodd"></path>
          </svg>
        </a>
      </div>
    )
  }
}

Chip.propTypes = {
  onClickChip: React.PropTypes.func,
  onRequestDelete: React.PropTypes.func,
  label: React.PropTypes.string,
  show: React.PropTypes.bool,
}

export default cssModules(Chip, styles)