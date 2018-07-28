import React, {Component} from 'react'
import ForgotPasswordForm from 'components/Auth/ForgotPasswordForm'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import cssModules from 'react-css-modules'
import {asyncValidate, validate} from 'validations/ForgotPasswordFormValidator'
import * as asyncAction from 'actions/AsyncActionCreator'
import styles from './LoginFormContainer.module.scss'
import Network from 'utils/network'
import * as Actions from 'actions/ForgotPasswordActionCreator'

class ForgotPasswordFormContainer extends Component {
  submit({email}) {
    this.props.requestToChangePassword(email);
  }

  render() {
    const { emailSent, sentEmailSuccessfully } = this.props.forgotPassword
    if (sentEmailSuccessfully) {
      return (
        <div className="sign-block">
          <div className="mb-20">
            <h5>{this.context.t('please_check_your_email')}</h5>
          </div>
          <p>
            {this.context.t('check_email_description', {email: <strong>{emailSent}</strong>})}
          </p>
        </div>
      )
    }

    return (
      <div className="sign-block">
        <div className="">
          <h2>{this.context.t("forgot_password")}</h2>
          <p>{this.context.t("forgot_password_description")}</p>
        </div>
        <ForgotPasswordForm onSubmit={this.submit.bind(this)}
                            clearError={this.props.clearForgotPasswordError.bind(this)}
                            {...this.props}/>
      </div>
    );
  }
}

ForgotPasswordFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  forgotPassword: state.forgotPassword
});

const mapDispatchToProps = (dispatch) => ({
  requestToChangePassword: (email) => dispatch({
    type: asyncAction.RESET_PASSWORD,
    payload: Network().post('change_password_requests', {email}),
    meta: 'forgotPasswordPlaceholder'
  }),
  clearForgotPasswordError: () => dispatch(Actions.clearError())
})

const StyledComponent = cssModules(ForgotPasswordFormContainer, styles)

export default connect(
  mapStateToProps, mapDispatchToProps
)( reduxForm({
  form: 'forgotPassword',
  fields: ['email'],
  validate
})(StyledComponent))
