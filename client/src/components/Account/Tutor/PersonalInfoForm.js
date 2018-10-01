import * as React from 'react';
import {Component} from 'react';
import FormField from '../../Core/FormField';
import {TutorAccountConstants} from '../../../constants/index';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';
import {countries} from '../../../constants/Countries';

export class PersonalInfoForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    const countryList = countries.map(country => ({
      id: country.code,
      text: country.name
    }));
    const self = this;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div>
          <FormField
            fieldId="firstNameId"
            fieldLabel={this.context.t('account.person.info.full_name')}
            placeholder={this.context.t('account.person.info.full_name')}
            isMandatoryField
            formControlName="name"
            typeField="custom_input"
          />
        </div>
        <div>
          <FormField
            fieldId="emailId"
            fieldLabel={this.context.t('account.person.info.email')}
            isMandatoryField
            formControlName="email"
            typeField="custom_input"
          />
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="datepicker-box">
              <FormField
                fieldId="birthDateId"
                fieldLabel={this.context.t('account.person.info.birth.date')}
                formControlName="date_of_birth"
                typeField="datepicker"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div>
              <FormField
                fieldId="genderId"
                fieldLabel={this.context.t('account.person.info.gender')}
                formControlName="gender"
                typeField="custom_select"
                options={TutorAccountConstants.genders.map((g) => { return { id: g[0], text: self.context.t(g[1]) }; })}
              />
            </div>
          </div>
        </div>
        <div>
          <FormField
            fieldId="addressId"
            fieldLabel={this.context.t('account.person.info.address')}
            placeholder={this.context.t('account.person.info.address')}
            formControlName="address"
            typeField="custom_input"
          />
        </div>
        <div>
          <FormField
            fieldId="countryId"
            fieldLabel={this.context.t('account.person.info.country')}
            placeholder={this.context.t('account.person.info.country')}
            options={countryList}
            formControlName="country_code"
            typeField="custom_select"
          />
        </div>
        <div className="form-group">
          <PrimaryButton
            isPrimary
            line={false}
            type="submit"
            title={this.context.t('save')}
          />
          <PrimaryButton
            isPrimary={false}
            line
            type="button"
            customClasses="ml-15"
            callback={this.props.cancel}
            title={this.context.t('cancel')}
          />
        </div>
      </form>
    );
  }
}

PersonalInfoForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

PersonalInfoForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
};
