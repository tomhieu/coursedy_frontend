import React, {Component} from 'react';
import {LoginForm} from '../../components/index';
import styles from './LoginFormContainer.module.scss';
import cssModules from 'react-css-modules';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {asyncValidate, validate} from 'validations/SignInFormValidation';
import {loginUser} from "actions/SessionActionCreator";
import { getQueryParam } from 'utils/network'
import ThirdPartyLoginContainer from './ThirdPartyLoginContainer';

class LoginFormContainer extends Component {
  loginUser({email, password}) {
    const nextUrl = getQueryParam('next', this.props.location.search) + this.props.location.hash
    this.props.login(email, password, nextUrl);
  }

  render() {
    return (
      <div className="sign-block">
        <h2><span className="login-title">{this.context.t('login')}</span> {this.context.t('with_your_account')}</h2>
        <ThirdPartyLoginContainer/>
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
  LoginComponent: state.LoginComponent
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password, nextUrl) => dispatch(loginUser(email,  password, nextUrl))
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
