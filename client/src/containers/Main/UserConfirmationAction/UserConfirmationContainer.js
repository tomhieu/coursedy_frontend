import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as WebConstants from '../../../constants/WebConstants';
import SimpleDialogComponent from '../../../components/Core/SimpleDialogComponent';
import { TT } from '../../../utils/locale';

class UserConfirmationContainer extends Component {
  executeConfirmCallback(callback) {
    callback();
    this.props.closeConfirmationPopup();
  }

  render() {
    const {
      showConfirmationPopup, confirmationTitle, confirmCallback, confirmationMessage
    } = this.props;
    return (
      <div className="confirmation-popup">
        <SimpleDialogComponent
          show={showConfirmationPopup}
          cancelLabel={TT.t('close')}
          title={confirmationTitle}
          cancelCallback={this.props.closeConfirmationPopup.bind(this)}
          acceptCallback={confirmCallback ? this.executeConfirmCallback.bind(this, confirmCallback) : undefined}
        >
          <div>{confirmationMessage}</div>
        </SimpleDialogComponent>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { main } = state;
  const {
    showConfirmationPopup, confirmationTitle, confirmCallback, confirmationMessage
  } = main;
  return {
    showConfirmationPopup, confirmationTitle, confirmCallback, confirmationMessage
  };
};

const mapDispatchToProps = dispatch => ({
  closeConfirmationPopup: () => dispatch({ type: WebConstants.CLOSE_CONFIRMATION_POPUP })
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(UserConfirmationContainer);
