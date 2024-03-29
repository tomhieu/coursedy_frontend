import React, { Component } from 'react';
import ForgotPasswordForm from 'components/Auth/ForgotPasswordForm';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import cssModules from 'react-css-modules';
import { asyncValidate, validate } from 'validations/ForgotPasswordFormValidator';
import * as asyncAction from 'actions/AsyncActionCreator';
import Network from 'utils/network';
import * as Actions from 'actions/ForgotPasswordActionCreator';
import styles from './LoginFormContainer.module.scss';
import { openConfirmationPopup } from '../../actions/MainActionCreator';
import { TT } from '../../utils/locale';

class ForgotPasswordFormContainer extends Component {
  submit({ email }) {
    this.props.requestToChangePassword(email, this.context.t('check_email_description', {
      email: <strong>{email}</strong>,
      breakNewLine: <br />
    }));
  }

  render() {
    const { emailSent, sentEmailSuccessfully } = this.props.forgotPassword;
    const placeholderId = "forgotPasswordPlaceholder";
    const { activatingPlaceholders } = this.props
    const isProcessing = activatingPlaceholders.findIndex(holder => placeholderId == holder) >= 0;
    return (
      <div className="sign-block">
        <div className="">
          <h2>{this.context.t('forgot_password')}</h2>
          <p>{this.context.t('forgot_password_description')}</p>
        </div>
        <ForgotPasswordForm
          onSubmit={this.submit.bind(this)}
          clearError={this.props.clearForgotPasswordError.bind(this)}
          {...this.props}
          placeholderId={placeholderId}
          isProcessing={isProcessing}
        />
      </div>
    );
  }
}

ForgotPasswordFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forgotPassword: state.forgotPassword,
  activatingPlaceholders: state.LoadingMask.activatingPlaceholders
});

const mapDispatchToProps = dispatch => ({
  requestToChangePassword: (email, successMessage) => {
    dispatch({
      type: asyncAction.RESET_PASSWORD,
      payload: Network().post('change_password_requests', { email }),
      meta: 'forgotPasswordPlaceholder'
    }).then((value, action) => {
      dispatch(openConfirmationPopup(TT.t('please_check_your_email'), successMessage));
      dispatch(reset('forgotPassword'));
    });
  },
  clearForgotPasswordError: () => dispatch(Actions.clearError())
});

const StyledComponent = cssModules(ForgotPasswordFormContainer, styles);

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'forgotPassword',
  fields: ['email'],
  validate
})(StyledComponent));
