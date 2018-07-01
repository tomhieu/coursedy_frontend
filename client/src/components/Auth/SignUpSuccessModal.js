import React, {Component} from 'react';
import SimpleDialogComponent from "../Core/SimpleDialogComponent";

class SignUpSuccessModal extends Component {
  render(){
    const {show, close} = this.props;
    return (
      <SimpleDialogComponent show={show} title={this.context.t('sign_up_success')} acceptCallback={close} acceptLabel={this.context.t('close')}>
        <p> {this.context.t('congrat_sign_up_success')} </p>
      </SimpleDialogComponent>
    )
  }
}

SignUpSuccessModal.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default SignUpSuccessModal