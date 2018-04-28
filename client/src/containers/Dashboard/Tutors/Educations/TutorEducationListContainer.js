import * as React from "react";
import {Component} from "react";
import TutorEducationList from "components/Dashboard/Tutors/Educations/TutorEducationList";
import {TutorEducationForm} from "components/Dashboard/Tutors/Educations/TutorEducationForm";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import * as actions from "actions/DashboarTutorEducationListActionCreator";
import NewEducationFormContainer from './NewEducationFormContainer'

class TutorEducationListContainer extends Component {
  componentWillMount() {
    this.props.loadEducationList()
  }

  showNewEducationForm() {
    this.props.showNewEducationForm()
  }

  deleteItem(tutorId, id) {
    this.props.deleteItem(tutorId, id)
  }

  showEditEducationForm(educationId) {
    this.props.showEditEducationForm(educationId)
  }

  render() {
    let {educations} = this.props

    let {showNewTutorEducationForm} = this.props

    return (
      <div className="row user-detail">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account.tutot.edu.level.title")}</span>
            <div className='clearfix'></div>
          </div>
          <TutorEducationList educations={educations} deleteItem={this.deleteItem.bind(this)}
                              currentEducation={this.props.currentEducation}
                              showEditEducationForm={this.showEditEducationForm.bind(this)}/>
          {
            showNewTutorEducationForm ?
              (<div>
                <hr/>
                <NewEducationFormContainer/>
              </div>) : (<div></div>)
          }
          {
            !showNewTutorEducationForm ?
              <button className='btn btn-link-light' onClick={this.showNewEducationForm.bind(this)}><i
                className='fa fa-plus'/> {this.context.t('account.tutot.edu.add_education')}</button> : null
          }
        </div>
      </div>
    )
  }
}

TutorEducationListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  loadEducationList: () => dispatch(actions.loadEducationList()),
  showNewEducationForm: () => dispatch(actions.showDashboardTutorNewEducationForm()),
  deleteItem: (tutorId, id) => dispatch(actions.deleteEducation(tutorId, id)),
  showEditEducationForm: (educationId) => dispatch(actions.showEditEducationForm(educationId))
})

const mapStateToProps = (state) => ({
  educations: state.DashboardTutorEducationList.educations,
  currentEducation: state.DashboardTutorEducationList.currentEducation,
  showNewTutorEducationForm: state.DashboardTutorEducationList.showNewTutorEducationForm
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorEducationListContainer);
