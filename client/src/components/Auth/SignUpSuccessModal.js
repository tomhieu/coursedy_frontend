import React, { Component } from 'react';
import SimpleDialogComponent from '../Core/SimpleDialogComponent';

class SignUpSuccessModal extends Component {
  render() {
    const { show, close } = this.props;
    return (
      <SimpleDialogComponent
        show={show} title={this.context.t('sign_up_success')}
        cancelCallback={close}
      >
        <p>
          {' '}
          {this.context.t('congrat_sign_up_success_1')}
          {' '}
        </p>
        <p>
          {' '}
          {this.context.t('congrat_sign_up_success_2')}
          {' '}
        </p>
        <p>
          {' '}
          {this.context.t('congrat_sign_up_success_3')}
          {' '}
        </p>
      </SimpleDialogComponent>
    );
  }
}

SignUpSuccessModal.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default SignUpSuccessModal;
