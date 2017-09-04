import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './RegisterForm.module.scss';
import {FormGroup, Button, Form, ControlLabel, FormControl} from 'react-bootstrap';
import {Auth} from 'j-toker'
import Select2 from 'react-select2-wrapper';

class RegisterForm extends Component {
  render() {
    return (
      <Form action="#" bsStyle="form-signup comment-form" method="post">
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel> {this.context.t("register_as")} &nbsp;<font color="red">*</font> </ControlLabel>
          <div className="dark-picker dark-picker-bright">
            <Select2
              data={[
                { text: this.context.t("student"), id: 1 },
                { text: this.context.t("tutor"), id: 2 },
                { text: this.context.t("teacher"), id: 3 }
              ]}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("first_name")}&nbsp;<font color="red">*</font> </ControlLabel>
          <FormControl type="text" placeholder={this.context.t("first_name")} name="first_name"/>
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("last_name")} </ControlLabel>
          <FormControl type="text" placeholder={this.context.t("last_name")} name="last_name"/>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel> {this.context.t("email")} <font color="red">*</font> </ControlLabel>
          <FormControl type="email" placeholder={this.context.t("email")} name="email"/>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel> {this.context.t("password")} <font color="red">*</font> </ControlLabel>
          <FormControl type="password" placeholder={this.context.t("password")} name="password"/>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel> {this.context.t("confirm_password")} <font color="red">*</font> </ControlLabel>
          <FormControl type="password" placeholder={this.context.t("confirm_password")} name="password_confirm"/>
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("phone_number")}&nbsp;<font color="red">*</font> </ControlLabel>
          <FormControl type="text" placeholder={this.context.t("phone_number")} name="phone_number"/>
        </FormGroup>

        <Button className="btn-link-dark  center-block" type="submit" name="create"> {this.context.t("register")} </Button>
      </Form>
    )
  }
}

RegisterForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RegisterForm.propTypes = {
}

export default cssModules(RegisterForm, styles);