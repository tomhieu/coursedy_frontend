import {Component} from "react";
import FormField from "../../Core/FormField";
import * as React from "react";
import {savePersonData} from "actions/TutorAccountCreator";

export class PersonalInfoForm extends Component {

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div >
          <FormField formGroupId="firstNameId" formLabel={this.context.t("account.person.info.full_name")}
                     placeholder={this.context.t("account.person.info.full_name")} isMandatoryField={true}
                     formControlName="name" typeField="custom_input"/>
        </div>
        <div>
          <FormField formGroupId="emailId" formLabel={this.context.t("account.person.info.email")}
                     isMandatoryField={true} formControlName="email" typeField="custom_input"/>
        </div>
        <div className="datepicker-box">
          <FormField formGroupId="birthDateId" formLabel={this.context.t("account.person.info.birth.date")}
                     isMandatoryField={true} formControlName="birthDate" typeField="datepicker"/>
        </div>
        <div>
          <FormField formGroupId="addressId" formLabel={this.context.t("account.person.info.address")}
                     placeholder={this.context.t("account.person.info.address")} isMandatoryField={true}
                     formControlName="address" typeField="custom_input"/>
        </div>
        <div className='form-group'>
          <button type="submit"
                  className="btn-link-dark top20">{this.context.t("account.person.info.save.btn")}</button>
        </div>
      </form>
    )
  }
}

PersonalInfoForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PersonalInfoForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}