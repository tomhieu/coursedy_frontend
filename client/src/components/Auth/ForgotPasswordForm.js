import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { Field } from 'redux-form';
import PrimaryButton from '../Core/PrimaryButton/PrimaryButton';
import styles from './LoginForm.module.scss';
import './LoginRegisterForm.scss';
import { renderField } from '../Core/CustomComponents';
import './AuthForm.scss';

class ForgotPasswordForm extends Component {
  render() {
    const { handleSubmit, placeholderId, isProcessing } = this.props;
    const { errors } = this.props.forgotPassword;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-forgot-pass">
        <div className={errors ? styles.shouldBeVisible : styles.shouldNotBeVisible}>
          <span className="error">
            <div className="alert alert-danger">
              <a
                href="#"
                className="close"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.clearError();
                }}
              >×</a>
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

        <div className="d-flex justify-content-center">
          <PrimaryButton
            type="submit"
            customClasses={styles.loginButton}
            title={this.context.t('send')}
            line={false}
            round
            disabled={isProcessing}
            placeholderId={placeholderId}
          />
        </div>
      </form>
    );
  }
}

ForgotPasswordForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

ForgotPasswordForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  placeholderId: React.PropTypes.string,
  isProcessing: React.PropTypes.bool
};

export default cssModules(ForgotPasswordForm, styles);
