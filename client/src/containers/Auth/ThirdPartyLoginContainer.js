import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {Field} from 'redux-form';
import {FormGroup, ControlLabel} from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {loginFacebook, loginGoogle} from "../../actions/SessionActionCreator";
import {
  reset3RdLoginForm,
  set3RdLoginErrors,
  setFacebookResponse,
  setGoogleResponse,
  checkUserExistance
} from "../../actions/ThirdPartyLoginActionCreator";
import ThirdPartyLoginReducer from "../../reducers/ThirdPartyLoginReducer";
import {TT} from "../../utils/locale";
import Modal from "react-bootstrap4-modal";
import PrimaryButton from "../../components/Core/PrimaryButton/PrimaryButton";
import {renderRadioFields} from "../../components/Core/CustomComponents";
import {ROLES} from "../../constants/Roles";
import {validate} from "../../validations/SignUpFormValidation";

class ThirdPartyLoginContainer extends Component {
  handleFacebookResponse(response) {
    if (response.hasOwnProperty('status') && response.status == undefined) {
      this.props.setErrors(TT.t('third_pary_login_error'))
    } else {
      this.props.setFacebookResponse(response)
      this.props.checkUserExistance(response.email, response, 'facebook')
    }
  }

  handleLogin({role}) {
    if (this.props.google && this.props.google.tokenId) {
      let {tokenId} = this.props.google
      this.props.loginGoogle(tokenId, role)
    } else if (this.props.facebook && this.props.facebook.accessToken) {
      let {accessToken, id} = this.props.facebook
      this.props.loginFacebook(accessToken, id, role)
    } else {
      this.props.setErrors(TT.t('third_pary_login_error'))
    }
    this.props.resetForm()
  }

  handleGoogleResponse(response) {
    if (response.hasOwnProperty('error')) {
      this.props.setErrors(TT.t('third_pary_login_error'))
    } else {
      this.props.setGoogleResponse(response)
      this.props.checkUserExistance(response.profileObj.email, response, 'google')
    }
  }

  render() {
    const showRoleSelectingModal = this.props.showRoleSelectingModal;
    const {handleSubmit} = this.props

    return (
      <div>
        {this.props.errors.length > 0 ? (
          <div className='error alert alert-danger mb-15'> {this.props.errors[0]} </div>) : null}
        <FacebookLogin
          appId="1054559741372976"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.handleFacebookResponse.bind(this)}
          icon="fa-facebook-square"
          cssClass='facebook-login-btn'
          textButton={this.context.t('login_with_facebook')}
        />

        <GoogleLogin
          clientId="864253356921-6pdh77qqvaf5nn7kip6mbf8ptevoov90.apps.googleusercontent.com"
          buttonText={this.context.t('login_with_google')}
          onSuccess={this.handleGoogleResponse.bind(this)}
          onFailure={this.handleGoogleResponse.bind(this)}
          className='google-login-btn'
        >
          <i className="fa fa-google-plus-square"/>
          <span> {this.context.t('login_with_google')} </span>
        </GoogleLogin>
        <Modal visible={showRoleSelectingModal} onClickBackdrop={this.props.resetForm.bind(this)}>
          <form onSubmit={handleSubmit(this.handleLogin.bind(this))} className="form-signup">
            <div className="modal-header">
              <h5 className="modal-title">{TT.t('sellect_role')}</h5>
            </div>
            <div className="modal-body">
              <FormGroup controlId="formHorizontalEmail">
                <Field
                  name="role"
                  component={renderRadioFields}
                  options={ROLES.reduce((acc, curr) => {
                    acc[curr] = TT.t(curr)
                    return acc
                  }, {})}
                />
              </FormGroup>
            </div>
            <div className="modal-footer">
              <PrimaryButton type="submit" line={false}
                             isPrimary={true}
                             isSmallButton={true}
                             title={TT.t('login')}>
              </PrimaryButton>
              <PrimaryButton type="button" line={true}
                             callback={this.props.resetForm.bind(this)}
                             isPrimary={false}
                             isSmallButton={true}
                             title={TT.t('close')}>
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

ThirdPartyLoginContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  facebook: state.ThirdPartyLoginReducer.facebook,
  google: state.ThirdPartyLoginReducer.google,
  errors: state.ThirdPartyLoginReducer.errors,
  showRoleSelectingModal: state.ThirdPartyLoginReducer.showRoleSelectingModal
});

const mapDispatchToProps = (dispatch) => ({
  loginFacebook: (accessToken, facebookId, role) => dispatch(loginFacebook(accessToken, facebookId, role)),
  loginGoogle: (tokenId, role) => dispatch(loginGoogle(tokenId, role)),
  setErrors: (error) => dispatch(set3RdLoginErrors(error)),
  resetForm: () => dispatch(reset3RdLoginForm()),
  setFacebookResponse: (response) => dispatch(setFacebookResponse(response)),
  setGoogleResponse: (response) => dispatch(setGoogleResponse(response)),
  checkUserExistance: (email, response, provider) => dispatch(checkUserExistance(email, response, provider))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'signUpBy3rdParty',
  fields: ['role'],
  validate
})(ThirdPartyLoginContainer));
