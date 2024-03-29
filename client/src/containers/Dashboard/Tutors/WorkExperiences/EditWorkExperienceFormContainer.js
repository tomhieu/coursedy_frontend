import * as React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from 'actions/DashboarTutorWorkExperienceListActionCreator';
import { TutorWorkExperienceForm } from 'components/Dashboard/Tutors/WorkExperiences/TutorWorkExperienceForm';
import { validate } from '../../../../validations/TutorWorkExperienceFormValidation';

class EditWorkExperienceFormContainer extends Component {
  hideEditWorkExperienceForm() {
    this.props.dispatch(actions.hideEditWorkExperienceForm());
  }

  updateWorkExperience(params) {
    const workExperience = this.props.initialValues;
    this.props.dispatch(actions.updateWorkExperience(workExperience.tutor_id, workExperience.id, params));
  }

  render() {
    const placeholderId = "tutorWorkExperiencePlaceholder";
    const { activatingPlaceholders } = this.props
    const isProcessing = activatingPlaceholders.findIndex(holder => placeholderId == holder) >= 0;
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <TutorWorkExperienceForm 
            onSubmit={this.updateWorkExperience.bind(this)} 
            cancel={this.hideEditWorkExperienceForm.bind(this)} 
            {...this.props}
            isProcessing={isProcessing}
            placeholderId={placeholderId}
          />
        </div>
      </div>
    );
  }
}

EditWorkExperienceFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  initialValues: state.DashboardTutorWorkExperienceList.currentWorkExperience,
  activatingPlaceholders: state.LoadingMask.activatingPlaceholders
});

export default connect(mapStateToProps)(reduxForm({
  form: 'editTutorWorkExperienceForm',
  fields: ['title', 'company', 'start_date', 'end_date', 'description'],
  validate
})(EditWorkExperienceFormContainer));
