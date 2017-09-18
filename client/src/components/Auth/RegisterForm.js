import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './RegisterForm.module.scss';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Auth} from 'j-toker'
import Select2 from 'react-select2-wrapper';
import {Field} from 'redux-form';
import {TT} from '../../utils/locale'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className='full-width-input-wrapper'>
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
    <input {...input} placeholder={label} type={type}/>
  </div>
)

const renderSelect = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <Select2 {...input}
           data={[
             { text: TT.t("student"), id: 1 },
             { text: TT.t("teacher"), id: 2 },
             { text: TT.t("tutor"), id: 3 }
           ]}
    />
    {touched && ((error && <span className='input-errors'>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

class RegisterForm extends Component {
  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-signin comment-form">
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel> {this.context.t("register_as")} &nbsp;<font color="red">*</font> </ControlLabel>
          <div className="dark-picker dark-picker-bright">
            <Field
              name="role"
              component={renderSelect}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("first_name")}&nbsp;<font color="red">*</font> </ControlLabel>
          <Field
            name="first_name"
            component={renderField}
            type="text"
            placeholder={this.context.t("first_name")}
            className="form-control"
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("last_name")} </ControlLabel>
          <Field
            name="last_name"
            component={renderField}
            type="text"
            placeholder={this.context.t("last_name")}
            className="form-control"
          />
        </FormGroup>

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

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel> {this.context.t("password")} <font color="red">*</font> </ControlLabel>
          <Field
            name="password"
            component={renderField}
            type="password"
            placeholder={this.context.t("password")}
            className="form-control"
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel> {this.context.t("confirm_password")} <font color="red">*</font> </ControlLabel>
          <Field
            name="password_confirmation"
            component={renderField}
            type="password"
            placeholder={this.context.t("confirm_password")}
            className="form-control"
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("phone_number")}</ControlLabel>
          <Field
            name="phone_number"
            component={renderField}
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