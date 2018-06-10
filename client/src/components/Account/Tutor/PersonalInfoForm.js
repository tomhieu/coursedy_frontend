import {Component} from "react";
import FormField from "../../Core/FormField";
import * as React from "react";
import {TutorAccountConstants} from '../../../constants/index'
import PrimaryButton from "../../Core/PrimaryButton/PrimaryButton";

export class PersonalInfoForm extends Component {

  render() {
    const {handleSubmit} = this.props;
    let self = this;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div>
          <FormField fieldId="firstNameId" fieldLabel={this.context.t("account.person.info.full_name")}
                     placeholder={this.context.t("account.person.info.full_name")} isMandatoryField={true}
                     formControlName="name" typeField="custom_input"/>
        </div>
        <div>
          <FormField fieldId="emailId" fieldLabel={this.context.t("account.person.info.email")}
                     isMandatoryField={true} formControlName="email" typeField="custom_input"/>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className="datepicker-box">
              <FormField fieldId="birthDateId" fieldLabel={this.context.t("account.person.info.birth.date")}
                         formControlName="date_of_birth" typeField="datepicker"/>
            </div>
          </div>
          <div className='col-sm-3'>
            <div >
              <FormField fieldId="genderId" fieldLabel={this.context.t("account.person.info.gender")}
                         formControlName="gender" typeField="custom_select"
                         options = {TutorAccountConstants.genders.map(g => {return {id: g[0], text: self.context.t(g[1])}})}
              />
            </div>
          </div>
        </div>
        <div>
          <FormField fieldId="addressId" fieldLabel={this.context.t("account.person.info.address")}
                     placeholder={this.context.t("account.person.info.address")}
                     formControlName="address" typeField="custom_input"/>
        </div>
        <div className='form-group'>
          <PrimaryButton isPrimary={true} line={false}
                         type="submit"
                         title={this.context.t("save")}>
          </PrimaryButton>
          <PrimaryButton isPrimary={false} line={true}
                         type="button"
                         customClasses="ml-15"
                         callback={this.props.cancel}
                         title={this.context.t("cancel")}>
          </PrimaryButton>
        </div>
      </form>
    )
  }
}

PersonalInfoForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PersonalInfoForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
}