import React, {Component} from "react";
import ChangePasswordContainer from "../../Account/ChangePasswordContainer";
import cssModules from 'react-css-modules';
import { connect } from "react-redux";
import { AccountContainers } from "../../index";
import { UserInfo } from '../../../components/index'
import * as Actions from '../../../actions/TutorAccountActionCreator'
import {closeEmailConfirmationModal} from "../../../actions/TutorAccountActionCreator";
import {RequireEmailConfirmationModal, TutorEducationDetailComponent} from '../../../components/index'

class AccountProfileContainer extends Component {
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
  editProfileMode: state.StudentAccountReducer.editProfileMode,
  editEducationMode: state.StudentAccountReducer.editEducationMode,
  editPasswordMode: state.StudentAccountReducer.editPasswordMode,
  showEmailConfirmationModal: state.StudentAccountReducer.showEmailConfirmationModal,
  user: state.StudentAccountReducer.user,
  tutor: state.StudentAccountReducer.tutor
})

export default connect(
  mapStateToProps
)(AccountProfileContainer)