import React, {Component} from "react";
import ChangePassword from "./ChangePassword";
import TutorEducation from "./TutorEducation";
import cssModules from 'react-css-modules';
import {connect} from "react-redux";
import PersonInfoContainer from "./PersonInfo";
import {UserInfo} from 'components/index'
import * as Actions from '../../../actions/TutorAccountActionCreator'
import {closeEmailConfirmationModal} from "../../../actions/TutorAccountActionCreator";
import {RequireEmailConfirmationModal, TutorEducationDetailComponent} from '../../../components/index'

class TutorAccount extends Component {
  componentWillMount(){
    this.props.dispatch(Actions.fetchUser())
  }

  showProfileEditForm(){
    this.props.dispatch(Actions.showProfileEditForm())
  }

  showEducationEditForm(){
    this.props.dispatch(Actions.showEducationEditForm())
  }

  hideProfileEditForm(){
    this.props.dispatch(Actions.hideProfileEditForm())
  }

  hideEducationEditForm(){
    this.props.dispatch(Actions.hideEducationEditForm())
  }

  closeEmailConfirmationModal(){
    this.props.dispatch(closeEmailConfirmationModal())
  }

  render() {
    let {editProfileMode, editEducationMode, editPasswordMode, user, tutor} = this.props;
    let profileForm = <PersonInfoContainer cancel={this.hideProfileEditForm.bind(this)} />
    if (!editProfileMode) profileForm = <UserInfo user={user} showEditForm={this.showProfileEditForm.bind(this)}/>
    let tutorForm = <TutorEducation tutor={tutor} cancel={this.hideEducationEditForm.bind(this)}/>
    if (!editEducationMode) tutorForm = <TutorEducationDetailComponent tutor={tutor} showEditForm={this.showEducationEditForm.bind(this)}/>

    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content-section ">
          <div className="">
            {profileForm}
          </div>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content-section ">
          <div className="">
            {tutorForm}
          </div>
        </div>
        <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content-section ">
          <div className="t">
            <ChangePassword/>
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
  editProfileMode: state.TutorAccount.editProfileMode,
  editEducationMode: state.TutorAccount.editEducationMode,
  editPasswordMode: state.TutorAccount.editPasswordMode,
  showEmailConfirmationModal: state.TutorAccount.showEmailConfirmationModal,
  user: state.TutorAccount.user,
  tutor: state.TutorAccount.tutor
});

export default connect(
  mapStateToProps
)(TutorAccount);