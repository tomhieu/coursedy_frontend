import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginForm.module.scss';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import {Auth} from 'j-toker'
import * as Actions from '../../actions/LoginActionCreator'
import PrimaryButton from "../Core/PrimaryButton/PrimaryButton";

class LoginForm extends Component {
  hideLoginError(){
    this.props.dispatch(Actions.clearError());
  }

  render() {
    const {handleSubmit, submitting, pristine} = this.props;
    const {errors} = this.props.LoginComponent;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-signin">
        <div className={errors ? styles.shouldBeVisible : styles.shouldNotBeVisible}>
          <span className="error">
            <div className="alert alert-danger">
              <a href="#" className="close" onClick={this.hideLoginError.bind(this)}>×</a>
              <strong>{this.context.t("error")} ! </strong>
              <p className="error">{errors && errors[0]}</p>
            </div>
          </span>
        </div>
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel> {this.context.t("email")} <font color="red">*</font> </ControlLabel>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder={this.context.t("email")}
            className="form-control"
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel> {this.context.t("password")} <font color="red">*</font> </ControlLabel>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder={this.context.t("password")}
            className="form-control"
          />
        </FormGroup>

        <div className="d-flex justify-content-right">
          <a href="#" className="forgot-pass"> {this.context.t("forgot_password")}</a>
        </div>

        <div className="d-flex justify-content-center">
          <PrimaryButton type="submit" disabled={pristine || submitting}
                         customClasses={styles.loginButton}
                         title={this.context.t("login")} line={false} round={true}>
          </PrimaryButton>
        </div>
      </form>
    )
  }
}

LoginForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}

export default cssModules(LoginForm, styles);
