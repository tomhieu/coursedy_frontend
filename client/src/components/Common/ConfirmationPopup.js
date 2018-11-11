import React, { Component, PropTypes } from 'react';
import {
  Modal, ModalHeader, Button, ModalBody, ModalFooter
} from 'reactstrap';
import PrimaryButton from '../Core/PrimaryButton/PrimaryButton';

class ConfirmationPopup extends Component {
  render() {
    return (
      <Modal isOpen={this.props.show} onClosed={this.props.closePopup} backdrop>
        <ModalHeader toggle={this.props.closePopup}>
          {this.props.title}
        </ModalHeader>
        <ModalBody>
          <p>
            {' '}
            {this.props.message}
            {' '}
          </p>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton
            type="button"
            line={false}
            isPrimary
            customClasses="button accept-button"
            callback={this.props.confirm}
            title={this.context.t('confirm_delete')}
          />
          <PrimaryButton
            type="button"
            line
            isPrimary={false}
            customClasses="button cancel-button"
            callback={this.props.closePopup}
            title={this.context.t('close')}
          />
        </ModalFooter>
      </Modal>
    );
  }
}

ConfirmationPopup.contextTypes = {
  t: React.PropTypes.func.isRequired
};

ConfirmationPopup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired
};

export default ConfirmationPopup;
