import React, {Component} from "react";
import ChangePasswordContainer from "../ChangePasswordContainer";
import TutorEducation from "./TutorEducation";
import cssModules from 'react-css-modules';
import {connect} from "react-redux";
import PersonInfoContainer from "../PersonInfoContainer";
import Certificate from "./Certificate";
import {UserInfo} from 'components/index'

import { 
  AccountActions,
  TutorAccountActions
} from '../../../actions/index'
import {
  RequireEmailConfirmationModal, 
  TutorEducationDetailComponent
} from '../../../components/index'
import LoadingMask from "../../../components/LoadingMask/LoadingMask";
import {FETCH_CURRENT_USER, FETCH_TUTOR_DATA} from "../../../constants/Session";
import {CERTIFICATE, FETCH_TEACHER_SKILL_SET} from "../../../actions/AsyncActionCreator";
import Network from "utils/network";

class TutorAccount extends Component {
  componentWillMount(){
    this.props.fetchUser();
    this.props.loadListSkillData();
    this.props.loadDegrees();
  }

  showProfileEditForm(){
    this.props.showAccountEditForm();
  }

  showEducationEditForm(){
    this.props.showEducationEditForm();
  }

  hideProfileEditForm(){
    this.props.hideAccountEditForm();
  }

  hideEducationEditForm(){
    this.props.hideEducationEditForm();
  }

  closeEmailConfirmationModal(){
    this.props.hideEmailChangedPopup();
  }

  showEmailConfirmationModal() {
    this.props.showEmailChangedPopup();
  }

  render() {
    const {user, tutor} = this.props
    const {editProfileMode, editEducationMode} = this.props
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 col-sm-12 ">
          <LoadingMask placeholderId="userAccountPlaceholder"
                       normalPlaceholder={false}
                       facebookPlaceholder={true}
                       loaderType="USER_ACCOUNT_PLACEHOLDER">
            <div className="dashboard-content-section">
                {
                  editProfileMode ?
                    <PersonInfoContainer cancel={this.hideProfileEditForm.bind(this)} /> :
                    <UserInfo user={user} showEditForm={this.showProfileEditForm.bind(this)}/>
                }
            </div>
          </LoadingMask>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <LoadingMask placeholderId="userEducationPlaceholder"
                       normalPlaceholder={false}
                       facebookPlaceholder={true}
                       loaderType="USER_EDUCATION_PLACEHOLDER">
            <div className="dashboard-content-section">
              {
                editEducationMode ?
                  <TutorEducation tutor={tutor} cancel={this.hideEducationEditForm.bind(this)}/> :
                  <TutorEducationDetailComponent tutor={tutor} showEditForm={this.showEducationEditForm.bind(this)}/>
              }
            </div>
          </LoadingMask>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <LoadingMask placeholderId="userCertificatePlaceholder"
                       normalPlaceholder={false}
                       facebookPlaceholder={true}
                       loaderType="USER_CERTIFICATE_PLACEHOLDER">
            <div className="dashboard-content-section">
              <Certificate/>
            </div>
          </LoadingMask>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="dashboard-content-section">
            <ChangePasswordContainer/>
          </div>
        </div>
        <div className="col-md-12 col-xs-12 col-sm-12">
          <RequireEmailConfirmationModal close={this.closeEmailConfirmationModal.bind(this)} show={this.props.showEmailConfirmationModal}/>
        </div>
      </div>
    )
  }
}

TutorAccount.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  editPasswordMode: state.AccountReducer.editPasswordMode,
  user: state.AccountReducer.user,
  tutor: state.TutorAccountReducer.tutor,
  editProfileMode: state.AccountReducer.editProfileMode,
  editEducationMode: state.TutorAccountReducer.editEducationMode,
  showEmailConfirmationModal: state.AccountReducer.showEmailConfirmationModal
});

const mapStateToDispatch = (dispatch) => ({
  fetchUser: () => dispatch({
    type: FETCH_CURRENT_USER,
    payload: Network().get('current_user').then((res) => dispatch({
      type: FETCH_TUTOR_DATA,
      payload: Network().get('tutors/tutor_by_user', {user_id: res.id}),
      meta: 'userAccountPlaceholder'
    })),
    meta: 'userAccountPlaceholder'
  }),
  loadListSkillData: () => dispatch({
    type: FETCH_TEACHER_SKILL_SET,
    payload: Network().get('categories'),
    meta: 'userEducationPlaceholder'
  }),
  loadDegrees: () => dispatch({
    type: CERTIFICATE.load_tutor_certificate_list,
    payload: Network().get('degrees'),
    meta: 'userCertificatePlaceholder'
  }),
  showAccountEditForm: () => dispatch(AccountActions.showAccountEditForm()),
  showEducationEditForm: () => dispatch(TutorAccountActions.showEducationEditForm()),
  hideAccountEditForm: () => dispatch(AccountActions.hideAccountEditForm()),
  hideEducationEditForm: () => dispatch(TutorAccountActions.hideEducationEditForm()),
  showEducationEditForm: () => dispatch(TutorAccountActions.showEducationEditForm()),
  hideEmailChangedPopup: () => dispatch(AccountActions.hideEmailChangedPopup()),
  showEmailChangedPopup: () => dispatch(AccountActions.showEmailChangedPopup())
})

export default connect(
  mapStateToProps, mapStateToDispatch
)(TutorAccount);