import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import * as Action from 'actions/SignUpActionCreator';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { asyncValidate, validate } from 'validations/SignUpFormValidation';
import styles from './RegisterFormContainer.module.scss';
import { RegisterForm } from '../../components';

class RegisterFormContainer extends Component {
  submit({
    email, password, password_confirmation, name, phone_number, role
  }) {
    this.props.dispatch(Action.signUpUser(
      email,
      password,
      password_confirmation,
      name,
      phone_number,
      role
    ));
  }

  resetForm() {
    this.props.dispatch(Action.resetForm());
  }

  clearError() {
    this.props.dispatch(Action.clearError());
  }

  render() {
    const showErrorClass = this.props.SignUpComponent.errors ? 'error' : 'hidden';
    return (
      <div className="sign-block">
        <h2>
          <span>
            {' '}
            {this.context.t('register')}
            {' '}
          </span>
          {' '}
          {this.context.t('new_account')}
          {' '}
        </h2>
        <span className={showErrorClass}>
          <div className="alert alert-danger">
            <a href="#" className="close" onClick={this.clearError.bind(this)}>×</a>
            <strong />
            <p className="error">{this.props.SignUpComponent.errors}</p>
          </div>
        </span>
        <RegisterForm onSubmit={this.submit.bind(this)} resetForm={this.resetForm.bind(this)} {...this.props} />
      </div>
    );
  }
}


RegisterFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

RegisterFormContainer.propTypes = {

};

const mapStateToProps = state => ({
  SignUpComponent: state.SignUpComponent,
  lang: state.i18nState.lang
});

const StyledComponent = cssModules(RegisterFormContainer, styles);

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'signUp',
  fields: ['email', 'password', 'name', 'phone_number', 'country_code', 'role'],
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(StyledComponent));
