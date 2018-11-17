import * as React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './TutorForm.module.scss';
import FormField from '../../../components/Core/FormField';
import { TutorAccountActions } from '../../../actions/index';
import { validate } from '../../../validations/TutorFormValidation';
import PrimaryButton from '../../../components/Core/PrimaryButton/PrimaryButton';


class TutorForm extends Component {
  constructor(props) {
    super(props);
    this.updateEducation.bind(this);
  }

  updateEducation(data) {
    this.props.dispatch(TutorAccountActions.updateTutorEducation(this.props.tutor.id, data));
  }

  render() {
    const {
      handleSubmit, listLevel, degrees, skills, certificates, uploadFiles, skillSet, certificateSet
    } = this.props;
    const placeholderId = "userEducationPlaceholder";
    const { activatingPlaceholders } = this.props
    const isProcessing = activatingPlaceholders.findIndex(holder => placeholderId == holder) >= 0;
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t('account_tutor_edu_title')}</span>
          </div>
          <form onSubmit={handleSubmit(this.updateEducation.bind(this))}>
            <div>
              <FormField
                fieldId="titleId"
                fieldLabel={this.context.t('account.tutot.edu.ocupation')}
                isMandatoryField
                formControlName="title"
                typeField="custom_input"
              />
            </div>
            <div>
              <FormField
                fieldId="placeOfWorkId"
                fieldLabel={this.context.t('account.tutot.edu.place_of_work')}
                isMandatoryField
                formControlName="place_of_work"
                typeField="custom_input"
              />
            </div>
            <div>
              <FormField
                fieldId="descriptionId"
                fieldLabel={this.context.t('account.tutor.edu.description')}
                placeholder={this.context.t('account.tutor.edu.description_placeholder')}
                isMandatoryField
                formControlName="description"
                typeField="rich_text_editor"
                customClassName="quill-form-control"
              />
            </div>

            <div>
              <FormField
                fieldId="skillsId"
                fieldLabel={this.context.t('account_facebook_title')}
                formControlName="facebook"
                typeField="custom_input"
              />
            </div>

            <div>
              <FormField
                fieldId="skillsId"
                fieldLabel={this.context.t('account_linkin_title')}
                formControlName="linkedin"
                typeField="custom_input"
              />
            </div>

            <div>
              <FormField
                fieldId="skillsId"
                fieldLabel={this.context.t('account_google_plus_title')}
                formControlName="google_plus"
                typeField="custom_input"
              />
            </div>

            <div>
              <FormField
                fieldId="skillsId"
                fieldLabel={this.context.t('account_tweater_title')}
                formControlName="tweater"
                typeField="custom_input"
              />
            </div>

            <div>
              <FormField
                fieldId="skillsId"
                fieldLabel={this.context.t('account_tutor_skill_title')}
                options={skillSet}
                formControlName="categories"
                typeField="multi_select"
              />
            </div>

            <div className="form-group">
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

TutorForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { EducationData, addNewDocumentFile } = state;
  const { degrees, skillSet } = EducationData;
  const { uploadFiles } = addNewDocumentFile;
  const tutor = state.TutorAccountReducer.tutor;

  const skills = tutor.categories.map((t) => {
    return t.id;
  });

  return {
    degrees,
    uploadFiles,
    skillSet,
    tutor,
    initialValues: { ...tutor, categories: skills },
    activatingPlaceholders: state.LoadingMask.activatingPlaceholders
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'tutorEducation',
  fields: ['title', 'description', 'categories', 'linkedin', 'facebook', 'tweeter', 'google_plus'],
  enableReinitialize: true,
  onSubmit: TutorAccountActions.updateTutorEducation(),
  validate
})(cssModules(TutorForm, styles)));
