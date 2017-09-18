import React, { Component } from 'react';
import { RegisterForm } from '../../components';
import styles from './RegisterFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as Action from '../../actions/SignUpActionCreater';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {TT} from '../../utils/locale'

class RegisterFormContainer extends Component {
  submit({email, password, password_confirmation, first_name, last_name, phone_number, role}) {
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

  resetForm(){
    this.props.dispatch(Action.resetForm())
  }

  render() {
    return (
      <div className="sign-block">
        <h2><span> {this.context.t("register")} </span> {this.context.t("new_account")} </h2>
        <span className="error"/>
        <RegisterForm onSubmit={this.submit.bind(this)} resetForm={this.resetForm.bind(this)} {...this.props}/>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.role) {
    errors.role = TT.t('role_required')
  }

  if (!values.first_name) {
    errors.first_name = TT.t('first_name_required')
  }

  if (!values.email) {
    errors.email = TT.t('registration_email_require')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = TT.t('invalid_email')
  }

  if (!values.password) {
    errors.password = TT.t('password_required')
  } else if (values.password.length < 8) {
    errors.password = TT.t('invalid_password')
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = TT.t('password_confirmation_required')
  } else if (values.password_confirmation != values.password) {
    errors.password_confirmation = TT.t('password_confirmation_not_match')
  }

  if (!values.phone_number) {
    errors.phone_number = TT.t('phone_number_required')
  } else if (!/^\d*$/i.test(values.phone_number)) {
    errors.phone_number = TT.t('invalid_phone_number')
  }

  return errors
}


RegisterFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RegisterFormContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  SignUpStatus: state.SignUpComponent.success
});

const StyledComponent = cssModules(RegisterFormContainer, styles);

export default connect(
  mapStateToProps
)( reduxForm({
  form: 'signUp',
  fields: ['email', 'password', 'first_name', 'last_name', 'phone_number', 'role'],
  validate
})(StyledComponent));