import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { Field } from 'redux-form';
import { Auth } from 'j-toker';
import { Link } from 'react-router-dom';
import * as Actions from '../../actions/LoginActionCreator';
import PrimaryButton from '../Core/PrimaryButton/PrimaryButton';
import styles from './LoginForm.module.scss';
import './LoginRegisterForm.scss';
import { renderField } from '../Core/CustomComponents';
import LoadingMask from '../../containers/LoadingMask/LoadingMask';

class LoginForm extends Component {
  hideLoginError() {
    this.props.dispatch(Actions.clearError());
  }

  render() {
    const { handleSubmit } = this.props;
    const { errors } = this.props.LoginComponent;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-signin">
        <div className={errors ? styles.shouldBeVisible : styles.shouldNotBeVisible}>
          <span className="error">
            <div className="alert alert-danger">
              <a href="#" className="close" onClick={this.hideLoginError.bind(this)}>×</a>
              <strong>
                {this.context.t('error')}
                {' '}
!
                {' '}
              </strong>
              <p className="error">{errors && errors[0]}</p>
            </div>
          </span>
        </div>
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel>
            {' '}
            {this.context.t('email')}
            {' '}
            <font color="red">*</font>
            {' '}
          </ControlLabel>
          <Field
            name="email"
            component={renderField}
            type="email"
            placeholder={this.context.t('email')}
            className="form-control"
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel>
            {' '}
            {this.context.t('password')}
            {' '}
            <font color="red">*</font>
            {' '}
          </ControlLabel>
          <Field
            name="password"
            component={renderField}
            type="password"
            placeholder={this.context.t('password')}
            className="form-control"
          />
        </FormGroup>

        <div className="d-flex justify-content-right">
          <Link to="/forgot-password" className="forgot-pass">
            {' '}
            {this.context.t('forgot_password')}
          </Link>
        </div>

        <div className="d-flex justify-content-center">
          <PrimaryButton
            type="submit"
            customClasses={styles.loginButton}
            title={this.context.t('login')}
            line={false}
            round
          />
          <LoadingMask placeholderId="loginPlaceholder" isFullLoading />
        </div>

        <div className="d-flex justify-content-center mt-10">
          {this.context.t('login_link_to_signup', { register: <Link to="/register" className="link-in-form">{this.context.t('register')}</Link> })}
        </div>
      </form>
    );
  }
}

LoginForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

export default cssModules(LoginForm, styles);
