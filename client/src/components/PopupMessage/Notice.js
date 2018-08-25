import React, { Component, PropTypes } from 'react';
import {
  Modal, ModalHeader, Button, ModalBody, ModalFooter
} from 'reactstrap';

class Notice extends Component {
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
          <Button className="btn-link-dark" onClick={this.props.closePopup}>{this.context.t('close')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Notice.contextTypes = {
  t: React.PropTypes.func.isRequired
};

Notice.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default Notice;
