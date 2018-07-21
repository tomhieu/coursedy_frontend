import React, {Component} from 'react'
import RecoverPasswordForm from 'components/Auth/RecoverPasswordForm'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import cssModules from 'react-css-modules'
import {asyncValidate, validate} from 'validations/ForgotPasswordFormValidator'
import * as asyncAction from 'actions/AsyncActionCreator'
import styles from './LoginFormContainer.module.scss'
import Network from 'utils/network'
import * as types from 'constants/RecoverPasswordComponent'
import LoadingMask from 'components/LoadingMask/LoadingMask'
import { CHECK_TOKEN_STATUS } from 'reducers/Auth/RecoverPasswordReducer'


class RecoverPasswordContainer extends Component {
  submit({new_password, new_password_confirmation}) {
    this.props.setNewPassword(new_password, new_password_confirmation, this.props.match.token)
  }

  componentDidMount() {
    this.props.checkToken(this.props.match.token)
  }

  render() {

    let display = null
    if (this.props.recoverPassword.tokenStatus === CHECK_TOKEN_STATUS.SUCCESS) {
      display = (
          <div className="sign-block">
            <div className="mb-20">
              <h2>{this.context.t("recover_password")}?</h2>
            </div>
            <RecoverPasswordForm onSubmit={this.submit.bind(this)}
                                 clearError={this.props.clearRecoverPasswordError}
                                 {...this.props}/>
          </div>
        )
    } else if (this.props.recoverPassword.tokenStatus === CHECK_TOKEN_STATUS.FAIL) {
      display = (
        <center>{this.context.t('token_invalid_or_expired')}</center>
      )
    }

    return (
      <LoadingMask placeholderId="checkTokenRecoverPasswordPlaceholder" isFullLoading={true}>
        {display}
      </LoadingMask>
    )
  }
}

RecoverPasswordContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  recoverPassword: state.recoverPassword
});

const mapDispatchToProps = (dispatch) => ({
  checkToken: (token) => dispatch({
    type: asyncAction.CHECK_RECOVER_PASSWORD_TOKEN,
    payload: Network().post('auth/recover-password', {token}),
    meta: "checkTokenRecoverPasswordPlaceholder"
  }),
  setNewPassword: (new_password, new_password_confirmation, token) => dispatch({
    type: asyncAction.SET_NEW_PASSWORD,
    payload: Network().post('auth/set-password', {new_password, new_password_confirmation, token}),
    meta: 'recoverPasswordPlaceholder'
  }),
  clearRecoverPasswordError: () => dispatch(({
    type: types.CLEAR_RECOVER_PASSWORD_ERROR
  }))
})

const StyledComponent = cssModules(RecoverPasswordContainer, styles)

export default connect(
  mapStateToProps, mapDispatchToProps
)( reduxForm({
  form: 'recoverPassword',
  fields: ['new_password', 'new_password_confirmation'],
  validate,
  asyncValidate
})(StyledComponent))
