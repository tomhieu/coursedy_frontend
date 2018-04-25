import React, {Component} from 'react';
import {LoginForm} from '../../components/index';
import styles from './LoginFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as asyncAction from '../../actions/AsyncActionCreator';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Network from "utils/network";


class LoginFormContainer extends Component {
  loginUser({email, password}) {
    this.props.login(email, password);
  }

  render() {
    return (
      <div className="sign-block signin-left">
        <h2><span>{this.context.t('login')}</span> {this.context.t('with_your_account')}</h2>
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
  login: (email, password) => dispatch({
    type: asyncAction.LOGIN,
    payload: Network().post('auth/sign_in', {email, password}),
    meta: 'loginPlaceholder'
  })
})

const StyledComponent = cssModules(LoginFormContainer, styles);

export default connect(
  mapStateToProps, mapDispatchToProps
)( reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(StyledComponent));
