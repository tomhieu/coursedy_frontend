import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { asyncValidate, validate } from 'validations/SignInFormValidation';
import { loginUser } from 'actions/SessionActionCreator';
import { getQueryParam } from 'utils/network';
import styles from './LoginFormContainer.module.scss';
import { LoginForm } from '../../components/index';
import ThirdPartyLoginContainer from './ThirdPartyLoginContainer';

class LoginFormContainer extends Component {
  loginUser({ email, password }) {
    const next = getQueryParam('next', this.props.location.search);
    const hash = this.props.location.hash;
    const nextUrl = next && hash ? next + hash : undefined;
    this.props.login(email, password, nextUrl);
  }

  render() {
    const placeholderId = "loginPlaceholder";
    const { activatingPlaceholders } = this.props
    const isProcessing = activatingPlaceholders.findIndex(holder => placeholderId === holder) >= 0;
    return (
      <div className="sign-block">
        <h2>
          <span className="login-title">{this.context.t('login')}</span>
          {' '}
          {this.context.t('with_your_account')}
        </h2>
        <ThirdPartyLoginContainer />
        <hr />
        <span className="error" />
        <LoginForm
          onSubmit={this.loginUser.bind(this)}
          {...this.props}
          placeholderId={placeholderId}
          isProcessing={isProcessing}
        />
      </div>
    );
  }
}

LoginFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

LoginFormContainer.propTypes = {

};

const mapStateToProps = state => ({
  LoginComponent: state.LoginComponent,
  activatingPlaceholders: state.LoadingMask.activatingPlaceholders
});

const mapDispatchToProps = dispatch => ({
  login: (email, password, nextUrl) => dispatch(loginUser(email, password, nextUrl))
});

const StyledComponent = cssModules(LoginFormContainer, styles);

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate,
  asyncValidate,
  asyncChangeFields: ['email']
})(StyledComponent));
