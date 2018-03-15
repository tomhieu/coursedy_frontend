import React, {Component} from "react";
import cssModules from "react-css-modules";
import styles from "./LoadingMask.module.scss";
import {Auth} from "j-toker";
import {CircularProgress} from "material-ui";
import {connect} from "react-redux";
import {red500, red900} from "material-ui/styles/colors";

class LoadingMask extends Component {
  render() {
    const {belongingActions, processingActions} = this.props;
    const isProcessing = belongingActions.filter(act => processingActions.indexOf(act) >= 0).length > 0;
    return (
      <div>
          {
            isProcessing ? (
                  <div className={"d-flex justify-content-center " + styles.loadingMask}>
                      <div className="align-self-center">
                          <CircularProgress size={60} color={red900} />
                      </div>
                  </div> ) :
                  <div>
                      {this.props.children}
                  </div>
          }
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
