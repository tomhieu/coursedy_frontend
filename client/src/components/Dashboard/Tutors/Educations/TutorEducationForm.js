import {Component} from "react";
import * as React from "react";
import {ControlLabel, FormGroup} from "react-bootstrap";
import {Field} from "redux-form";
import FormField from "../../../Core/FormField";
import PrimaryButton from "../../../Core/PrimaryButton/PrimaryButton";

export class TutorEducationForm extends Component {
  render() {
    const {onSubmit, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField formControlName="title" typeField='custom_input' fieldLabel={this.context.t('account.tutot.edu.form.title')}/>
        <FormField formControlName="graduated_from" typeField='custom_input' fieldLabel={this.context.t('account.tutot.edu.form.graduated_from')}/>
        <div className='row'>
          <div className='col-sm-6 col-xs-12'>
            <FormField formControlName="start_date" typeField='datepicker' fieldLabel={this.context.t('account.tutot.edu.form.start_date')}/>
          </div>
          <div className='col-sm-6 col-xs-12'>
            <FormField formControlName="end_date" typeField='datepicker' fieldLabel={this.context.t('account.tutot.edu.form.end_date')}/>
          </div>
        </div>
        <FormField formControlName="description" typeField='custom_textarea' fieldLabel={this.context.t('account.tutot.edu.form.description')}/>
        <FormGroup>
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
        </FormGroup>
      </form>
    )
  }
}

TutorEducationForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorEducationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
}