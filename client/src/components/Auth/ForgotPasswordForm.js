import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginForm.module.scss';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import PrimaryButton from "../Core/PrimaryButton/PrimaryButton";
import { Link } from 'react-router-dom'
import './LoginRegisterForm.scss'
import { renderField } from '../Core/CustomComponents'
import './AuthForm.scss'

class ForgotPasswordForm extends Component {
  render() {
    const {handleSubmit} = this.props;
    const {errors} = this.props.forgotPassword;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-forgot-pass">
        <div className={errors ? styles.shouldBeVisible : styles.shouldNotBeVisible}>
          <span className="error">
            <div className="alert alert-danger">
              <a href="#" className="close" onClick={(e) => {
                e.preventDefault()
                this.props.clearError()
              }}>×</a>
              <strong>{this.context.t("error")} ! </strong>
              <p className="error">{errors && errors[0]}</p>
            </div>
          </span>
        </div>
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel> {this.context.t("email")} <font color="red">*</font> </ControlLabel>
          <Field
            name="email"
            component={renderField}
            type="email"
            placeholder={this.context.t("email")}
            className="form-control"
          />
        </FormGroup>

        <div className="d-flex justify-content-center">
          <PrimaryButton type="submit"
                         customClasses={styles.loginButton}
                         title={this.context.t("send")} line={false} round={true}>
          </PrimaryButton>
        </div>

        <div className="d-flex justify-content-center mt-10">
          <Link to="/login" className="link-in-form">{this.context.t('back')}</Link>
        </div>
      </form>
    )
  }
}

ForgotPasswordForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

ForgotPasswordForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default cssModules(ForgotPasswordForm, styles);
