import React, {Component} from "react";
import cssModules from "react-css-modules";
import styles from "./LoadingMask.module.scss";
import {Auth} from "j-toker";
import {CircularProgress} from "material-ui";
import {connect} from "react-redux";
import {red500, red900} from "material-ui/styles/colors";

class LoadingMask extends Component {
  render() {
    const {isFetching} = this.props;
    return (
      <div>
          {
              isFetching ? (
                  <div className={"d-flex justify-content-center " + styles.loadingMask}>
                      <div className="align-self-center">
                          <CircularProgress size={60} thickness={7} color={red900} />
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

const mapStateToProps = (state) => ({
    isFetching: state.LoadingMask.isFetching
});

export default connect(
    mapStateToProps
)(cssModules(LoadingMask, styles));
