import React, { PropTypes, Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './LoginForm.module.scss';
import {FormGroup, Button, Form, ControlLabel, FormControl} from 'react-bootstrap';
import {Auth} from 'j-toker'

class LoginForm extends Component {
  render() {
    return (
      <Form bsStyle="form-signin comment-form">
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel> {this.context.t("email")} <font color="red">*</font> </ControlLabel>
          <FormControl type="email" placeholder={this.context.t("email")} name="email"/>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel> {this.context.t("password")} <font color="red">*</font> </ControlLabel>
          <FormControl type="password" placeholder={this.context.t("password")} name="password"/>
        </FormGroup>

        <div className="check">
          <a href="http://dev.mindsworthy.com/tutorsci/demo/auth/forgot_password" className="forgot-pass"> {this.context.t("forgot_password")}</a>
        </div>

        <FormGroup>
          <Button type="submit" className="btn-link-dark signin-btn center-block"> {this.context.t("login")} </Button>
        </FormGroup>
      </Form>
    )
  }
}

LoginForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

LoginForm.propTypes = {
}

export default cssModules(LoginForm, styles);