import * as React from "react";
import {Component} from "react";
import {TutorEducationForm} from "components/Dashboard/Tutors/Educations/TutorEducationForm";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import * as actions from "actions/DashboarTutorEducationListActionCreator";

class NewEducationFormContainer extends Component {
  hideNewEducationForm() {
    this.props.dispatch(actions.hideDashboardTutorNewEducationForm())
  }

  createEducation(params){
    this.props.dispatch(actions.createEducation(this.props.tutor.id, params))
  }

  render() {
    return (
      <div className='bordered-box'>
        <TutorEducationForm onSubmit={this.createEducation.bind(this)} {...this.props} cancel={this.hideNewEducationForm.bind(this)}/>
      </div>
    )
  }
}

NewEducationFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  tutor: state.TutorAccountReducer.tutor,
});

export default connect(mapStateToProps)(reduxForm({
  form: 'newTutorEducationForm',
  fields: ['title', 'graduated_from', 'start_date', 'end_date', 'description']
})(NewEducationFormContainer));
