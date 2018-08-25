import * as React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { TutorEducationForm } from 'components/Dashboard/Tutors/Educations/TutorEducationForm';
import * as actions from 'actions/DashboarTutorEducationListActionCreator';
import { validate } from '../../../../validations/TutorEducationFormValidation';

class EditEducationFormContainer extends Component {
  hideEditEducationForm() {
    this.props.dispatch(actions.hideEditEducationForm());
  }

  updateEducation(params) {
    const education = this.props.initialValues;
    this.props.dispatch(actions.updateEducation(education.tutor_id, education.id, params));
  }

  render() {
    const { education } = this.props;

    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <TutorEducationForm onSubmit={this.updateEducation.bind(this)} cancel={this.hideEditEducationForm.bind(this)} {...this.props} />
        </div>
      </div>
    );
  }
}

EditEducationFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  initialValues: state.DashboardTutorEducationList.currentEducation
});

export default connect(mapStateToProps)(reduxForm({
  form: 'editTutorEducationForm',
  fields: ['title', 'graduated_from', 'start_date', 'end_date', 'description'],
  validate
})(EditEducationFormContainer));
