import * as React from "react";
import {Component} from "react";
import TutorEducationList from "components/Dashboard/Tutors/Educations/TutorEducationList";
import {TutorEducationForm} from "components/Dashboard/Tutors/Educations/TutorEducationForm";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import DashboardTutorEducationList from "reducers/Dashboard/Tutors/Educations/DashboardTutorEducationList";
import * as actions from "actions/DashboarTutorEducationListActionCreator";
import Network from "utils/network";

class TutorEducationListContainer extends Component {
  componentWillMount() {
    this.props.loadEducationList()
  }

  showNewEducationForm() {
    this.props.dispatch(actions.showDashboardTutorNewEducationForm())
  }

  hideNewEducationForm() {
    this.props.dispatch(actions.hideDashboardTutorNewEducationForm())
  }

  createEducation(params){
    this.props.dispatch(actions.createEducation(this.props.tutor.id, params))
  }

  deleteItem(tutorId, id){
    this.props.dispatch(actions.deleteEducation(tutorId, id))
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
          <TutorEducationList educations={educations} deleteItem={this.deleteItem.bind(this)}/>
          {
            showNewTutorEducationForm ?
              (<div>
                <hr/>
                <TutorEducationForm onSubmit={this.createEducation.bind(this)} {...this.props} cancel={this.hideNewEducationForm.bind(this)}/>
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
  loadEducationList: () => dispatch(actions.loadEducationList())
})

const mapStateToProps = (state) => ({
  educations: state.DashboardTutorEducationList.educations,
  tutor: state.TutorAccountReducer.tutor,
  showNewTutorEducationForm: state.DashboardTutorEducationList.showNewTutorEducationForm
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'newTutorEducationForm',
  fields: ['title', 'graduated_from', 'start_date', 'end_date', 'description']
})(TutorEducationListContainer));
