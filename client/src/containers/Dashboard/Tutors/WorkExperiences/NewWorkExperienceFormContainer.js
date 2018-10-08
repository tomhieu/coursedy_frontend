import * as React from 'react';
import { Component } from 'react';
import { TutorWorkExperienceForm } from 'components/Dashboard/Tutors/WorkExperiences/TutorWorkExperienceForm';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from 'actions/DashboarTutorWorkExperienceListActionCreator';
import { validate } from '../../../../validations/TutorWorkExperienceFormValidation';

class NewWorkExperienceFormContainer extends Component {
  hideNewWorkExperienceForm() {
    this.props.dispatch(actions.hideDashboardTutorNewWorkExperienceForm());
  }

  createWorkExperience(params) {
    this.props.dispatch(actions.createWorkExperience(this.props.tutor.id, params));
  }

  render() {
    const placeholderId = "tutorWorkExperiencePlaceholder";
    const { activatingPlaceholders } = this.props
    const isProcessing = activatingPlaceholders.findIndex(holder => placeholderId == holder) >= 0;
    return (
      <div className="bordered-box">
        <TutorWorkExperienceForm 
          onSubmit={this.createWorkExperience.bind(this)} 
          {...this.props} 
          cancel={this.hideNewWorkExperienceForm.bind(this)} 
          isProcessing={isProcessing}
          placeholderId={placeholderId}
        />
      </div>
    );
  }
}

NewWorkExperienceFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tutor: state.TutorAccountReducer.tutor,
  activatingPlaceholders: state.LoadingMask.activatingPlaceholders
});

export default connect(mapStateToProps)(reduxForm({
  form: 'newTutorWorkExperienceForm',
  fields: ['title', 'company', 'start_date', 'end_date', 'description'],
  validate
})(NewWorkExperienceFormContainer));
