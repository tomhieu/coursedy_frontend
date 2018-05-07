import React, {Component} from "react";
import cssModules from "react-css-modules";
import styles from "./LoadingMask.module.scss";
import {Auth} from "j-toker";
import {connect} from "react-redux";
import AsyncLoader from "./AsyncLoader";

class LoadingMask extends Component {
  render() {
    const {placeholderId, activatingPlaceholders,
      isFullLoading = false, normalPlaceholder = true, facebookPlaceholder = false, sectionPlaceholder = false,
      loaderType, repeatTime, innerClass="loading-mask-container d-flex flex-stretch"} = this.props;
    const isProcessing = activatingPlaceholders.findIndex(holder => placeholderId === holder) >= 0;
    return (
      <div className={innerClass}>
        {
          isProcessing ? <AsyncLoader isFullLoading={isFullLoading}
                                      normalPlaceholder={normalPlaceholder}
                                      facebookPlaceholder={facebookPlaceholder}
                                      sectionPlaceholder={sectionPlaceholder}
                                      loaderType={loaderType}
                                      repeatTime={repeatTime}>
                         </AsyncLoader> : null
        }
        {facebookPlaceholder && isProcessing ? null : this.props.children}
      </div>
    )
  }
}

LoadingMask.propTypes = {
  activatingPlaceholders: React.PropTypes.array.isRequired,
  placeholderId: React.PropTypes.string.isRequired,
  isFullLoading: React.PropTypes.bool,
  normalPlaceholder: React.PropTypes.bool,
  facebookPlaceholder: React.PropTypes.bool,
  sectionPlaceholder: React.PropTypes.bool,
  loaderType: React.PropTypes.string,
  repeatTime: React.PropTypes.number,
  innerClass: React.PropTypes.string,
};

const mapStateToProps = (state) => ({
  activatingPlaceholders: state.LoadingMask.activatingPlaceholders
});

export default connect(
    mapStateToProps
)(cssModules(LoadingMask, styles));
