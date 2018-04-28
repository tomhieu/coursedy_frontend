import * as React from "react";
import {Component} from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import * as actions from "actions/DashboarTutorWorkExperienceListActionCreator";
import {TutorWorkExperienceForm} from "components/Dashboard/Tutors/WorkExperiences/TutorWorkExperienceForm";

class EditWorkExperienceFormContainer extends Component {
  hideEditWorkExperienceForm() {
    this.props.dispatch(actions.hideEditWorkExperienceForm())
  }

  updateWorkExperience(params){
    let workExperience = this.props.initialValues
    this.props.dispatch(actions.updateWorkExperience(workExperience.tutor_id, workExperience.id, params))
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <TutorWorkExperienceForm onSubmit={this.updateWorkExperience.bind(this)} cancel={this.hideEditWorkExperienceForm.bind(this)} {...this.props}/>
        </div>
      </div>
    )
  }
}

EditWorkExperienceFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  initialValues: state.DashboardTutorWorkExperienceList.currentWorkExperience
});

export default connect(mapStateToProps)(reduxForm({
  form: 'editTutorWorkExperienceForm',
  fields: ['title', 'company', 'start_date', 'end_date', 'description']
})(EditWorkExperienceFormContainer));
