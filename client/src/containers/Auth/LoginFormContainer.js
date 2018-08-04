import React, {Component} from 'react';
import {LoginForm} from '../../components/index';
import styles from './LoginFormContainer.module.scss';
import cssModules from 'react-css-modules';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {asyncValidate, validate} from 'validations/SignInFormValidation';
import {loginUser} from "actions/SessionActionCreator";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {loginFacebook} from "../../actions/SessionActionCreator";


class LoginFormContainer extends Component {
  loginUser({email, password}) {
    this.props.login(email, password);
  }

  handleFacebookResponse(response) {
    this.props.dispatch(loginFacebook(response.accessToken, response.id))
  }

  componentClicked(){

  }

  responseGoogle(){

  }

  render() {
    return (
      <div className="sign-block">
        <h2><span className="login-title">{this.context.t('login')}</span> {this.context.t('with_your_account')}</h2>
        <FacebookLogin
          appId="1054559741372976"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked.bind(this)}
          callback={this.handleFacebookResponse.bind(this)}
          icon="fa-facebook-square"
          cssClass='facebook-login-btn'
          textButton={this.context.t('login_with_facebook')}
        />

        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText={this.context.t('login_with_google')}
          onSuccess={this.responseGoogle.bind(this)}
          onFailure={this.responseGoogle.bind(this)}
          className='google-login-btn'
        >
          <i className="fa fa-google-plus-square"/>
          <span> {this.context.t('login_with_google')} </span>
        </GoogleLogin>

        <hr/>
        <span className="error"/>
        <LoginForm onSubmit={this.loginUser.bind(this)} {...this.props}/>
      </div>
    );
  }
}

LoginFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

LoginFormContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  LoginComponent: state.LoginComponent,
  redirectPage: state.session.redirectPage
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(loginUser(email,  password))
})

const StyledComponent = cssModules(LoginFormContainer, styles);

export default connect(
  mapStateToProps, mapDispatchToProps
)( reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate,
  asyncValidate,
  asyncChangeFields: ['email']
})(StyledComponent));
