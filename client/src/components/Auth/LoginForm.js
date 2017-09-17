import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginForm.module.scss';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import {Auth} from 'j-toker'

class LoginForm extends Component {
  render() {
    const {handleSubmit, submitting, pristine} = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-signin comment-form">
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

        <div className="check">
          <a href="http://dev.mindsworthy.com/tutorsci/demo/auth/forgot_password"
             className="forgot-pass"> {this.context.t("forgot_password")}</a>
        </div>

        <FormGroup>
          <button type="submit"
                  className="btn btn-primary btn-link-dark signin-btn center-block"
                  disabled={pristine || submitting}
          >
            {this.context.t("login")}
          </button>
        </FormGroup>
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

export default  cssModules(LoginForm, styles);
