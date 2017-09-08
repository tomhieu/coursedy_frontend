import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './RegisterForm.module.scss';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {Auth} from 'j-toker'
import Select2 from 'react-select2-wrapper';
import {Field} from 'redux-form';

class RegisterForm extends Component {
  render() {
    console.log(this.props);
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-signin comment-form">
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
          <Field
            name="first_name"
            component="input"
            type="text"
            placeholder={this.context.t("first_name")}
            className="form-control"
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("last_name")} </ControlLabel>
          <Field
            name="last_name"
            component="input"
            type="text"
            placeholder={this.context.t("last_name")}
            className="form-control"
          />
        </FormGroup>

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

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel> {this.context.t("confirm_password")} <font color="red">*</font> </ControlLabel>
          <Field
            name="password_confirm"
            component="input"
            type="password"
            placeholder={this.context.t("confirm_password")}
            className="form-control"
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("phone_number")}&nbsp;<font color="red">*</font> </ControlLabel>
          <Field
            name="phone_number"
            component="input"
            type="text"
            placeholder={this.context.t("phone_number")}
            className="form-control"
          />
        </FormGroup>

        <button type="submit" className="btn btn-primary btn-link-dark center-block">
          {this.context.t("register")}
        </button>
      </form>
    )
  }
}

RegisterForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RegisterForm.propTypes = {
}

export default cssModules(RegisterForm, styles);