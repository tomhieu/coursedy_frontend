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
    this.props.resetPassword(email);
  }

  render() {
    return (
      <div className="sign-block">
        <div className="mb-20">
          <h2>{this.context.t("forgot_password")}?</h2>
          <p>{this.context.t("forgot_password_description")}</p>
        </div>
        <ForgotPasswordForm onSubmit={this.submit.bind(this)}
                            clearError={this.props.clearForgotPassword}
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
  resetPassword: (email) => dispatch({
    type: asyncAction.RESET_PASSWORD,
    payload: Network().post('auth/forgot-password', {email}),
    meta: 'forgotPasswordPlaceholder'
  }),
  clearForgotPassword: () => dispatch(Actions.clearError())
})

const StyledComponent = cssModules(ForgotPasswordFormContainer, styles)

export default connect(
  mapStateToProps, mapDispatchToProps
)( reduxForm({
  form: 'forgotPassword',
  fields: ['email'],
  validate,
  asyncValidate
})(StyledComponent))
