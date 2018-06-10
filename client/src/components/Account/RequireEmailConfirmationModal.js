import React, { Component } from 'react';
import {Modal, ModalHeader, Button, ModalBody, ModalFooter} from 'reactstrap';
import PrimaryButton from "../Core/PrimaryButton/PrimaryButton";

class RequireEmailConfirmationModal extends Component {
  render(){
    return (
      <Modal isOpen={this.props.show} onClosed={this.props.close} backdrop={true}>
        <ModalHeader toggle={this.props.close}>
          {this.context.t('change_email_success')}
        </ModalHeader>
        <ModalBody>
          <p> {this.context.t('update_email_successfully')} </p>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton type="button" callback={this.props.close} title={this.context.t('close')}>
          </PrimaryButton>
        </ModalFooter>
      </Modal>
    )
  }
}

RequireEmailConfirmationModal.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RequireEmailConfirmationModal.propTypes = {
  close: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool.isRequired
}

export default RequireEmailConfirmationModal