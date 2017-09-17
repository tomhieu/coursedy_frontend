import React, { Component } from 'react';
import { LoginForm } from '../../components/index';
import styles from './LoginFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as Action from '../../actions/LoginActionCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {reduxForm} from 'redux-form';

class LoginFormContainer extends Component {
  loginUser({email, password}) {
    this.props.dispatch(Action.loginUser(email, password));
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

});

const StyledComponent = cssModules(LoginFormContainer, styles);

export default connect(
  mapStateToProps
)( reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(StyledComponent));
