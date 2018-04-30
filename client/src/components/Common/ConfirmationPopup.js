import React, {Component, PropTypes} from 'react';
import {Modal, ModalHeader, Button, ModalBody, ModalFooter} from 'reactstrap';

class ConfirmationPopup extends Component {
  render() {
    return (
      <Modal isOpen={this.props.show} onClosed={this.props.closePopup} backdrop={true}>
        <ModalHeader toggle={this.props.closePopup}>
          {this.props.title}
        </ModalHeader>
        <ModalBody>
          <p> {this.props.message} </p>
        </ModalBody>
        <ModalFooter>
          <Button className='btn-link-dark' onClick={this.props.confirm}>{this.context.t('confirm_delete')}</Button>
          <Button className='btn-link-dark cancel-button' onClick={this.props.closePopup}>{this.context.t('close')}</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ConfirmationPopup.contextTypes = {
  t: React.PropTypes.func.isRequired
}

ConfirmationPopup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired
}

export default ConfirmationPopup;
