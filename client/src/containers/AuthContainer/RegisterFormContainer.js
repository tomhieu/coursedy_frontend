import React, { Component } from 'react';
import { RegisterForm } from '../../components';
import styles from './RegisterFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as Action from '../../actions/SignUpActionCreater';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';

class RegisterFormContainer extends Component {
  signUpUser({email, password}) {
    console.log(email);
    this.props.dispatch(Action.signUpUser(email, password));
  }

  render() {
    return (
      <div className="sign-block">
        <h2><span> {this.context.t("register")} </span> {this.context.t("new_account")} </h2>
        <span className="error"/>
        <RegisterForm onSubmit={this.signUpUser.bind(this)} {...this.props}/>
      </div>
    );
  }
}

RegisterFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RegisterFormContainer.propTypes = {

};

const mapStateToProps = (state) => ({

});

const StyledComponent = cssModules(RegisterFormContainer, styles);

export default connect(
  mapStateToProps
)( reduxForm({
  form: 'signUp',
  fields: ['email', 'password']
})(StyledComponent));