import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { Field } from 'redux-form';
import { TT } from 'utils/locale';
import { ROLES } from 'constants/Roles';
import SignUpSuccessModal from './SignUpSuccessModal';
import {
  renderField, renderRadioFields, renderSelect
} from '../Core/CustomComponents';
import PrimaryButton from '../Core/PrimaryButton/PrimaryButton';
import './LoginRegisterForm.scss';
import { Link } from 'react-router-dom';
import styles from './RegisterForm.module.scss';
import {countries} from '../../constants/Countries';
import normalizePhone from './normalizePhoneNumber';

class RegisterForm extends Component {
  render() {
    const { handleSubmit, placeholderId, isProcessing } = this.props;
    const countryList = countries.map(country => ({
      id: country.code,
      text: country.name
    }));
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)} className="form-signup">
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel>
            {' '}
            {this.context.t('register_as')}
            {' '}
            &nbsp;
            <font color="red">*</font>
            {' '}
          </ControlLabel>
          <Field
            name="role"
            component={renderRadioFields}
            options={ROLES.reduce((acc, curr) => {
              acc[curr] = TT.changeLocale(this.props.lang).t(curr);
              return acc;
            }, {})}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>
            {' '}
            {this.context.t('full_name')}
            &nbsp;
            <font color="red">*</font>
            {' '}
          </ControlLabel>
          <Field
            name="name"
            component={renderField}
            type="text"
            placeholder={this.context.t('full_name')}
            className="form-control"
          />
        </FormGroup>

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

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel>
            {' '}
            {this.context.t('password')}
            {' '}
            <font color="red">*</font>
            {' '}
          </ControlLabel>
          <Field
            name="password"
            component={renderField}
            type="password"
            placeholder={this.context.t('password')}
            className="form-control"
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel>
            {' '}
            {this.context.t('confirm_password')}
            {' '}
            <font color="red">*</font>
            {' '}
          </ControlLabel>
          <Field
            name="password_confirmation"
            component={renderField}
            type="password"
            placeholder={this.context.t('confirm_password')}
            className="form-control"
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalCountry">
          <ControlLabel>
            {' '}
            {this.context.t('account.person.info.country')}
            {' '}
            <font color="red">*</font>
            {' '}
          </ControlLabel>
          <Field
            name="country_code"
            component={renderSelect(countryList)}
            placeholder={this.context.t('account.person.info.country')}
            className="form-control"
          />
        </FormGroup>

        <FormGroup>
          <div className="d-flex flex-vertical">
            <ControlLabel>
              {' '}
              {this.context.t('phone_number')}
            </ControlLabel>
            <span className="hint-text">{this.context.t('phone_number_hint')}</span>
          </div>
          <Field
            name="phone_number"
            component={renderField}
            type="text"
            placeholder={this.context.t('phone_number')}
            className="form-control"
            normalize={normalizePhone}
          />
        </FormGroup>

        <div className="sigup-term-privacy d-flex justify-content-center">
          <p>{this.context.t('signup_term', { term: <a target="_blank" href="/terms">{this.context.t('term')}</a>, privacy: <a target="_blank" href="/privacy">{this.context.t('privacy')}</a> })}</p>
        </div>

        <div className="d-flex justify-content-center">
          <PrimaryButton
            type="submit"
            round
            customClasses={styles.registerButton}
            title={this.context.t('register_now')}
            line={false}
            placeholderId={placeholderId}
            disabled={isProcessing}
          />
        </div>

        <div className="d-flex justify-content-center mt-10">
          {this.context.t('signup_link_to_login', { login: <Link to="/login" className="link-in-form">{this.context.t('login')}</Link> })}
        </div>
        <SignUpSuccessModal show={this.props.SignUpComponent.success} close={this.props.resetForm} />
      </form>
    );
  }
}

RegisterForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

RegisterForm.propTypes = {
  placeholderId: React.PropTypes.string,
  isProcessing: React.PropTypes.bool
};

export default cssModules(RegisterForm, styles);
