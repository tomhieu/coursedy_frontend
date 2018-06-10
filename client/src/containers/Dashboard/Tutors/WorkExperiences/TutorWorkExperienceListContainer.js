import * as React from "react";
import {Component} from "react";
import TutorWorkExperienceList from "components/Dashboard/Tutors/WorkExperiences/TutorWorkExperienceList";
import {TutorWorkExperienceForm} from "components/Dashboard/Tutors/WorkExperiences/TutorWorkExperienceForm";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import * as actions from "actions/DashboarTutorWorkExperienceListActionCreator";
import NewWorkExperienceFormContainer from './NewWorkExperienceFormContainer'
import PrimaryButton from "../../../../components/Core/PrimaryButton/PrimaryButton";

class TutorWorkExperienceListContainer extends Component {
  componentWillMount() {
    this.props.loadWorkExperienceList()
  }

  showNewWorkExperienceForm() {
    this.props.showNewWorkExperienceForm()
  }

  deleteItem(tutorId, id) {
    this.props.deleteItem(tutorId, id)
  }

  showEditWorkExperienceForm(id) {
    this.props.showEditWorkExperienceForm(id)
  }

  render() {
    let {workExperiences} = this.props

    let {showNewTutorWorkExperienceForm} = this.props

    return (
      <div className="row user-detail">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account.tutot.work_experience.level.title")}</span>
            <div className='clearfix'></div>
          </div>
          <TutorWorkExperienceList workExperiences={workExperiences} deleteItem={this.deleteItem.bind(this)}
                              currentWorkExperience={this.props.currentWorkExperience}
                              showEditWorkExperienceForm={this.showEditWorkExperienceForm.bind(this)}/>
          {
            showNewTutorWorkExperienceForm ?
              (<div>
                <hr/>
                <NewWorkExperienceFormContainer/>
              </div>) : (<div></div>)
          }
          {
            !showNewTutorWorkExperienceForm ?
              <PrimaryButton isPrimary={true} line={true}
                             iconButton={true}
                             type="button"
                             callback={this.showNewWorkExperienceForm.bind(this)}
                             title={this.context.t('account.tutot.edu.add_work_experience')}>
                <i className='fa fa-plus'/>
              </PrimaryButton> : null
          }
        </div>
      </div>
    )
  }
}

TutorWorkExperienceListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  loadWorkExperienceList: () => dispatch(actions.loadWorkExperienceList()),
  showNewWorkExperienceForm: () => dispatch(actions.showDashboardTutorNewWorkExperienceForm()),
  deleteItem: (tutorId, id) => dispatch(actions.deleteWorkExperience(tutorId, id)),
  showEditWorkExperienceForm: (workExperienceId) => dispatch(actions.showEditWorkExperienceForm(workExperienceId))
})

const mapStateToProps = (state) => ({
  workExperiences: state.DashboardTutorWorkExperienceList.workExperiences,
  currentWorkExperience: state.DashboardTutorWorkExperienceList.currentWorkExperience,
  showNewTutorWorkExperienceForm: state.DashboardTutorWorkExperienceList.showNewTutorWorkExperienceForm
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorWorkExperienceListContainer);
