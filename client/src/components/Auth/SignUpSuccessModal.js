import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

class SignUpSuccessModal extends Component {
  render(){
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.context.t('sign_up_success')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {this.context.t('congrat_sign_up_success')} </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

SignUpSuccessModal.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default SignUpSuccessModal