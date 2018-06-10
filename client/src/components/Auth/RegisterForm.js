import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './RegisterForm.module.scss';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import {TT} from '../../utils/locale'
import {ROLES} from "constants/Roles";
import SignUpSuccessModal from "./SignUpSuccessModal";
import {renderSelect, renderField} from "../Core/CustomComponents";
import PrimaryButton from "../Core/PrimaryButton/PrimaryButton";

const renderSelectComponent = renderSelect(ROLES.map((role) => ({text: TT.t(role), id: role})))

class RegisterForm extends Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-signin">
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel> {this.context.t("register_as")} &nbsp;<font color="red">*</font> </ControlLabel>
          <Field
            name="role"
            component={renderSelectComponent}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel> {this.context.t("full_name")}&nbsp;<font color="red">*</font> </ControlLabel>
          <Field
            name="name"
            component={renderField}
            type="text"
            placeholder={this.context.t("full_name")}
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

        <div className="d-flex justify-content-center">
          <PrimaryButton type="submit" round={true}
                         customClasses={styles.registerButton}
                         title={this.context.t("register_now")} line={false}>
          </PrimaryButton>
        </div>
        <SignUpSuccessModal show={this.props.SignUpComponent.success} close={this.props.resetForm}/>
      </form>
    )
  }
}

RegisterForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RegisterForm.propTypes = {}

export default cssModules(RegisterForm, styles);