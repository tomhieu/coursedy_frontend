import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { Auth } from 'j-toker';
import { connect } from 'react-redux';
import styles from './LoadingMask.module.scss';
import AsyncLoader from './AsyncLoader';

class LoadingMask extends Component {
  render() {
    const {
      placeholderId, activatingPlaceholders,
      isFullLoading = false, normalPlaceholder = true, facebookPlaceholder = false, sectionPlaceholder = false,
      loaderType, repeatTime, innerClass = 'loading-mask-container d-flex flex-stretch'
    } = this.props;

    let isProcessing = activatingPlaceholders.findIndex(holder => placeholderId === holder) >= 0;
    // const isProcessing = true;
    if (placeholderId === 'LIST_ENROLLED_STUDENT_PLACEHOLDER') {
      isProcessing = true;
    }
    return (
      <div className={innerClass}>
        {
          isProcessing ? (
            <AsyncLoader
              isFullLoading={isFullLoading}
              normalPlaceholder={normalPlaceholder}
              facebookPlaceholder={facebookPlaceholder}
              sectionPlaceholder={sectionPlaceholder}
              loaderType={loaderType}
              repeatTime={repeatTime}
            />
          ) : null
        }
        {facebookPlaceholder && isProcessing ? null : this.props.children}
      </div>
    );
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

const mapStateToProps = state => ({
  activatingPlaceholders: state.LoadingMask.activatingPlaceholders
});

export default connect(
  mapStateToProps
)(cssModules(LoadingMask, styles));
