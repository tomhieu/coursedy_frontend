import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

class RequireEmailConfirmationModal extends Component {
  render(){
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header>
          <Modal.Title>{this.context.t('change_email_success')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {this.context.t('update_email_successfully')} </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>{this.context.t('close')}</Button>
        </Modal.Footer>
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