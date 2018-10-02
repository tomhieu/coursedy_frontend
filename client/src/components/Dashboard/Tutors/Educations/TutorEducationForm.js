import { Component } from 'react';
import * as React from 'react';
import { FormGroup } from 'react-bootstrap';
import FormField from '../../../Core/FormField';
import PrimaryButton from '../../../Core/PrimaryButton/PrimaryButton';


export class TutorEducationForm extends Component {
  render() {
    const { onSubmit, handleSubmit, isProcessing, placeholderId } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          formControlName="title"
          typeField="custom_input"
          fieldId="eduTitle"
          fieldLabel={this.context.t('account.tutot.edu.form.title')}
        />
        <FormField
          formControlName="graduated_from"
          typeField="custom_input"
          fieldId="eduGraduateFrom"
          fieldLabel={this.context.t('account.tutot.edu.form.graduated_from')}
        />
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <FormField
              formControlName="start_date"
              typeField="datepicker"
              fieldId="eduStartDate"
              fieldLabel={this.context.t('account.tutot.edu.form.start_date')}
            />
          </div>
          <div className="col-sm-6 col-xs-12">
            <FormField
              formControlName="end_date"
              typeField="datepicker"
              fieldId="eduEndDate"
              fieldLabel={this.context.t('account.tutot.edu.form.end_date')}
            />
          </div>
        </div>
        <FormField
          formControlName="description"
          typeField="rich_text_editor"
          customClassName="quill-form-control"
          fieldId="eduDescription"
          fieldLabel={this.context.t('account.tutot.edu.form.description')}
        />
        <FormGroup>
          <PrimaryButton
            isPrimary
            line={false}
            type="submit"
            title={this.context.t('save')}
            placeholderId={placeholderId}
            disabled={isProcessing}
          />
          <PrimaryButton
            isPrimary={false}
            line
            type="button"
            customClasses="ml-15"
            callback={this.props.cancel}
            title={isProcessing ? "" : this.context.t('cancel')}
            disabled={isProcessing}
          />
        </FormGroup>
      </form>
    );
  }
}


TutorEducationForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorEducationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
};
