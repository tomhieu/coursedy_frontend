import React, { Component } from 'react';
import { RegisterForm } from '../../components';
import styles from './RegisterFormContainer.module.scss';
import cssModules from 'react-css-modules';
import * as Action from '../../actions/SignUpActionCreater';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {asyncValidate, validate} from '../../validations/SignUpFormValidation'

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




RegisterFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RegisterFormContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  SignUpComponent: state.SignUpComponent
});

const StyledComponent = cssModules(RegisterFormContainer, styles);

export default connect(
  mapStateToProps
)( reduxForm({
  form: 'signUp',
  fields: ['email', 'password', 'first_name', 'last_name', 'phone_number', 'role'],
  validate,
  asyncValidate
})(StyledComponent));