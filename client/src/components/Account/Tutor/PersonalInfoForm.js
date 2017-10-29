import {Component} from "react";
import FormField from "../../Core/FormField";
import * as React from "react";
import {savePersonData} from "actions/TutorAccountService";

export class PersonalInfoForm extends Component {

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)}>
                <div>
                    <div className="d-flex flex-horizontal">
                        <FormField formGroupId="firstNameId" formLabel={this.context.t("account.person.info.first.name")} placeholder={this.context.t("account.person.info.first.name")} isMandatoryField={true} formControlName="firstName" typeField="custom_input" />
                        <FormField formGroupId="lastNameId" formLabel={this.context.t("account.person.info.last.name")}  placeholder={this.context.t("account.person.info.last.name")}  isMandatoryField={true} formControlName="lastName" typeField="custom_input" />
                    </div>
                </div>
                <div>
                    <FormField formGroupId="emailId" formLabel={this.context.t("account.person.info.email")} isMandatoryField={true} formControlName="email" typeField="custom_input" />
                </div>
                <div>
                    <FormField formGroupId="birthDateId" formLabel={this.context.t("account.person.info.birth.date")} isMandatoryField={true} formControlName="birthDate" typeField="datepicker" />
                </div>
                <div>
                    <FormField formGroupId="addressId" formLabel={this.context.t("account.person.info.address")} placeholder={this.context.t("account.person.info.address")} isMandatoryField={true} formControlName="address" typeField="custom_input" />
                </div>
                <div>
                    <button type="submit" className="ml-15 mr-15 mt-15 btn-link-dark">{this.context.t("account.person.info.save.btn")}</button>
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