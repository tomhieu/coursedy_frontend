import {Component} from "react";
import FormField from "../../Core/FormField";
import * as React from "react";
import {TutorAccountConstants} from '../../../constants/index'

export class PersonalInfoForm extends Component {

  render() {
    const {handleSubmit} = this.props;
    let self = this;

    return (
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div>
          <FormField formGroupId="firstNameId" formLabel={this.context.t("account.person.info.full_name")}
                     placeholder={this.context.t("account.person.info.full_name")} isMandatoryField={true}
                     formControlName="name" typeField="custom_input"/>
        </div>
        <div>
          <FormField formGroupId="emailId" formLabel={this.context.t("account.person.info.email")}
                     isMandatoryField={true} formControlName="email" typeField="custom_input"/>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className="datepicker-box">
              <FormField formGroupId="birthDateId" formLabel={this.context.t("account.person.info.birth.date")}
                         formControlName="date_of_birth" typeField="datepicker"/>
            </div>
          </div>
          <div className='col-sm-3'>
            <div >
              <FormField formGroupId="genderId" formLabel={this.context.t("account.person.info.gender")}
                         formControlName="gender" typeField="custom_select"
                         options = {TutorAccountConstants.genders.map(g => {return {id: g[0], text: self.context.t(g[1])}})}
              />
            </div>
          </div>
        </div>
        <div>
          <FormField formGroupId="addressId" formLabel={this.context.t("account.person.info.address")}
                     placeholder={this.context.t("account.person.info.address")}
                     formControlName="address" typeField="custom_input"/>
        </div>
        <div className='form-group'>
          <button type="submit" className="btn btn-primary mr-10">{this.context.t("save")}</button>
          <button type="button" className="btn btn-default btn-small margin-left-10 cancel-button" onClick={this.props.cancel}>
            {this.context.t("cancel")}
          </button>
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