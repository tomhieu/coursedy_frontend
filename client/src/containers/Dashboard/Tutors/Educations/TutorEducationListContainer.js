import * as React from "react";
import {Component} from "react";
import TutorEducationList from "components/Dashboard/Tutors/Educations/TutorEducationList";
import {TutorEducationForm} from "components/Dashboard/Tutors/Educations/TutorEducationForm";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import DashboardTutorEducationList from "reducers/Dashboard/Tutors/Educations/DashboardTutorEducationList";
import * as actions from "actions/DashboarTutorEducationListActionCreator";

class TutorEducationListContainer extends Component {
  showNewEducationForm() {
    this.props.dispatch(actions.showDashboardTutorNewEducationForm())
  }

  hideNewEducationForm() {
    this.props.dispatch(actions.hideDashboardTutorNewEducationForm())
  }

  render() {
    let educations = [{
      id: 1,
      title: 'computer science',
      graduated_from: 'Dai hoc Bach Khoa HCM',
      start_date: '10/2010',
      end_date: '11/2015',
      description: 'tot nghiep dai hoc loai gioi, hoc lop ky su tai nang .....'
    },
      {
        id: 2,
        title: 'computer science',
        graduated_from: 'Dai hoc Bach Khoa HCM',
        start_date: '10/2010',
        end_date: '11/2015',
        description: 'tot nghiep dai hoc loai gioi, hoc lop ky su tai nang .....'
      }
    ]

    let {showNewTutorEducationForm} = this.props

    return (
      <div className="row user-detail">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account.tutot.edu.level.title")}</span>
            <div className='clearfix'></div>
          </div>
          <TutorEducationList educations={educations}/>
          {
            showNewTutorEducationForm ?
              (<div>
                <hr/>
                <TutorEducationForm onSubmit={this.showNewEducationForm.bind(this)} {...this.props} cancel={this.hideNewEducationForm.bind(this)}/>
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

const mapStateToProps = (state) => ({
  showNewTutorEducationForm: state.DashboardTutorEducationList.showNewTutorEducationForm
});

export default connect(mapStateToProps)(reduxForm({
  form: 'newTutorEducationForm',
  fields: ['title', 'graduated_from', 'start_date', 'end_date', 'description']
})(TutorEducationListContainer));
