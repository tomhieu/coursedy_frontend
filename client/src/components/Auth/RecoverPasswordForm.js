import React, {Component} from 'react';
import {Field} from 'redux-form'
import {FormGroup, ControlLabel} from 'react-bootstrap'
import cssModules from 'react-css-modules'
import PrimaryButton from "../Core/PrimaryButton/PrimaryButton"
import { renderField } from '../Core/CustomComponents'
import styles from './LoginForm.module.scss'
import './LoginRegisterForm.scss'
import './AuthForm.scss'

class RecoverPasswordForm extends Component {
  render() {
    const {handleSubmit} = this.props;
    const {errors} = this.props.recoverPassword;
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
          <ControlLabel> {this.context.t("your_new_password")} <font color="red">*</font> </ControlLabel>
          <Field
            name="new_password"
            component={renderField}
            type="password"
            placeholder={this.context.t("new_password")}
            className="form-control"
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel> {this.context.t("your_new_password_confirmation")} <font color="red">*</font> </ControlLabel>
          <Field
            name="new_password_confirmation"
            component={renderField}
            type="password"
            placeholder={this.context.t("new_password_confirmation")}
            className="form-control"
          />
        </FormGroup>

        <div className="d-flex justify-content-center">
          <PrimaryButton type="submit"
                         customClasses={styles.loginButton}
                         title={this.context.t("send")} line={false} round={true}>
          </PrimaryButton>
        </div>
      </form>
    )
  }
}

RecoverPasswordForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RecoverPasswordForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default cssModules(RecoverPasswordForm, styles);
