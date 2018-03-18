import React, {Component} from "react";
import ChangePasswordContainer from "../../Account/ChangePasswordContainer";
import cssModules from 'react-css-modules';
import { connect } from "react-redux";
import { AccountContainers } from "../../index";
import { UserInfo } from '../../../components/index'
import { 
  AccountActions,
  StudentAccountActions
} from '../../../actions/index'
import {RequireEmailConfirmationModal, TutorEducationDetailComponent} from '../../../components/index'

class AccountProfileContainer extends Component {
  componentWillMount(){
    this.props.dispatch(StudentAccountActions.fetchUser())
  }

  showProfileEditForm(){
    this.props.dispatch(AccountActions.showProfileEditForm())
  }

  hideProfileEditForm(){
    this.props.dispatch(AccountActions.hideProfileEditForm())
  }

  closeEmailConfirmationModal(){
    this.props.dispatch(AccountActions.closeEmailConfirmationModal())
  }

  render() {
    const {
      editProfileMode, 
      editEducationMode, 
      editPasswordMode, 
      user, 
      tutor
    } = this.props;
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 col-sm-12 dashboard-content-section ">
          <div className="">
            {
              editProfileMode ? 
                <AccountContainers.PersonInfoContainer cancel={this.hideProfileEditForm.bind(this)} /> :
                <UserInfo user={user} showEditForm={this.showProfileEditForm.bind(this)}/>
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

const mapStateToProps = (state) => ({
  editProfileMode: state.AccountReducer.editProfileMode,
  editEducationMode: state.AccountReducer.editEducationMode,
  editPasswordMode: state.AccountReducer.editPasswordMode,
  showEmailConfirmationModal: state.AccountReducer.showEmailConfirmationModal,
  user: state.AccountReducer.user,
  student: state.StudentAccountReducer.student
})

export default connect(
  mapStateToProps
)(AccountProfileContainer)