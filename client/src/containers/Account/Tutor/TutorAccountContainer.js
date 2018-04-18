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

class TutorAccount extends Component {
  componentWillMount(){
    this.props.dispatch(AccountActions.fetchUser())
    this.props.dispatch(TutorAccountActions.loadListSkillData())
  }

  showProfileEditForm(){
    this.props.dispatch(AccountActions.showAccountEditForm())
  }

  showEducationEditForm(){
    this.props.dispatch(TutorAccountActions.showEducationEditForm())
  }

  hideProfileEditForm(){
    this.props.dispatch(AccountActions.hideAccountEditForm())
  }

  hideEducationEditForm(){
    this.props.dispatch(TutorAccountActions.hideEducationEditForm())
  }

  closeEmailConfirmationModal(){
    this.props.dispatch(AccountActions.hideEmailChangedPopup())
  }

  showEmailConfirmationModal() {
    this.props.dispatch(AccountActions.showEmailChangedPopup())
  }

  render() {
    const {editPasswordMode, user, tutor} = this.props
    const {editProfileMode, editEducationMode} = this.props
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 col-sm-12 ">
          <div className="dashboard-content-section">
            {
              editProfileMode ?
                <PersonInfoContainer cancel={this.hideProfileEditForm.bind(this)} /> :
                <UserInfo user={user} showEditForm={this.showProfileEditForm.bind(this)}/>
            }
          </div>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="dashboard-content-section">
            {
              editEducationMode ?
                <TutorEducation tutor={tutor} cancel={this.hideEducationEditForm.bind(this)}/> :
                <TutorEducationDetailComponent tutor={tutor} showEditForm={this.showEducationEditForm.bind(this)}/>
            }
          </div>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="dashboard-content-section">
            <Certificate/>
          </div>
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

export default connect(
  mapStateToProps
)(TutorAccount);