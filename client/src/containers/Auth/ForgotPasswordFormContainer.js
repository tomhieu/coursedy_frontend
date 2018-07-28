import React, {Component} from 'react'
import ForgotPasswordForm from 'components/Auth/ForgotPasswordForm'
import { connect } from 'react-redux'
import {reduxForm, reset} from 'redux-form'
import cssModules from 'react-css-modules'
import {asyncValidate, validate} from 'validations/ForgotPasswordFormValidator'
import * as asyncAction from 'actions/AsyncActionCreator'
import styles from './LoginFormContainer.module.scss'
import Network from 'utils/network'
import * as Actions from 'actions/ForgotPasswordActionCreator'
import {openConfirmationPopup} from "../../actions/MainActionCreator";
import {TT} from "../../utils/locale";

class ForgotPasswordFormContainer extends Component {
  submit({email}) {
    this.props.requestToChangePassword(email);
  }

  render() {
    const { emailSent, sentEmailSuccessfully } = this.props.forgotPassword

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
  requestToChangePassword: (email) => {
    dispatch({
      type: asyncAction.RESET_PASSWORD,
      payload: Network().post('change_password_requests', {email}),
      meta: 'forgotPasswordPlaceholder'
    }).then((value, action) => {
      dispatch(openConfirmationPopup(TT.t('please_check_your_email'), TT.t('check_email_description', {email: email})))
      dispatch(reset('forgotPassword'))
    })
  },
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
