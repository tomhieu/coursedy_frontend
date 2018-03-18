import React, {Component} from "react";
import ChangePasswordContainer from "../ChangePasswordContainer";
import TutorEducation from "./TutorEducation";
import cssModules from 'react-css-modules';
import {connect} from "react-redux";
import PersonInfoContainer from "../PersonInfoContainer";
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
    this.props.dispatch(TutorAccountActions.fetchUser())
    this.props.dispatch(TutorAccountActions.loadListSkillData())
  }

  showProfileEditForm(){
    this.props.dispatch(AccountActions.showProfileEditForm())
  }

  showEducationEditForm(){
    this.props.dispatch(TutorAccountActions.showEducationEditForm())
  }

  hideProfileEditForm(){
    this.props.dispatch(AccountActions.hideProfileEditForm())
  }

  hideEducationEditForm(){
    this.props.dispatch(TutorAccountActions.hideEducationEditForm())
  }

  closeEmailConfirmationModal(){
    this.props.dispatch(AccountActions.closeEmailConfirmationModal())
  }

  render() {
    const {editProfileMode, editEducationMode, editPasswordMode, user, tutor} = this.props;
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content-section ">
          <div className="">
            {
              editProfileMode ? 
                <PersonInfoContainer cancel={this.hideProfileEditForm.bind(this)} /> :
                <UserInfo user={user} showEditForm={this.showProfileEditForm.bind(this)}/>
            }
          </div>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content-section ">
          <div className="">
            {
              editProfileMode ? 
                <TutorEducation tutor={tutor} cancel={this.hideEducationEditForm.bind(this)}/> :
                <TutorEducationDetailComponent tutor={tutor} showEditForm={this.showEducationEditForm.bind(this)}/>
            }
          </div>
        </div>
        <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content-section ">
          <div className="t">
            <ChangePasswordContainer/>
          </div>
        </div>
        <RequireEmailConfirmationModal close={this.closeEmailConfirmationModal.bind(this)} show={this.props.showEmailConfirmationModal}/>
      </div>
    )
  }
}

TutorAccount.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  editProfileMode: state.AccountReducer.editProfileMode,
  editEducationMode: state.AccountReducer.editEducationMode,
  editPasswordMode: state.AccountReducer.editPasswordMode,
  showEmailConfirmationModal: state.AccountReducer.showEmailConfirmationModal,
  user: state.AccountReducer.user,
  tutor: state.TutorAccountReducer.tutor
});

export default connect(
  mapStateToProps
)(TutorAccount);