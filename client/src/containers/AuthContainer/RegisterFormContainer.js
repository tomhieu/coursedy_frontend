import React, { Component } from 'react';
import { RegisterForm } from '../../components';
import styles from './RegisterFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as Action from '../../actions/SignUpActionCreater';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';

class RegisterFormContainer extends Component {
  signUpUser({email, password, password_confirmation, first_name, last_name, phone_number, role}) {
    this.props.dispatch(Action.signUpUser(
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      phone_number,
      role
    ));
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

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
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
  fields: ['email', 'password', 'first_name', 'last_name', 'phone_number']
})(StyledComponent));