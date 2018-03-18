import React, {Component} from "react";
import cssModules from "react-css-modules";
import styles from "./LoadingMask.module.scss";
import {Auth} from "j-toker";
import {connect} from "react-redux";

class LoadingMask extends Component {
  render() {
    const {belongingActions, processingActions} = this.props;
    const isProcessing = belongingActions.filter(act => processingActions.indexOf(act) >= 0).length > 0;
    return (
      <div className={isProcessing ? "loading-mask-container show-loading d-flex flex-stretch" : "loading-mask-container d-flex flex-stretch"}>
        <div className="loading-spin-wrapper">
          <div className="loading-spin"></div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

LoadingMask.propTypes = {
  processingActions: React.PropTypes.array.isRequired,
  belongingActions: React.PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  processingActions: state.LoadingMask.processingActions
});

export default connect(
    mapStateToProps
)(cssModules(LoadingMask, styles));
