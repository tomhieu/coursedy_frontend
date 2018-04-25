import React, {Component} from "react";
import ChangePasswordContainer from "../../Account/ChangePasswordContainer";
import {connect} from "react-redux";
import {AccountContainers} from "../../index";
import {RequireEmailConfirmationModal, UserInfo} from '../../../components/index'
import {AccountActions} from '../../../actions/index'

class AccountProfileContainer extends Component {
  componentWillMount(){
    this.props.dispatch(AccountActions.fetchUser())
  }

  showProfileEditForm(){
    this.props.dispatch(AccountActions.showAccountEditForm())
  }

  hideProfileEditForm(){
    this.props.dispatch(AccountActions.hideAccountEditForm())
  }

  closeEmailConfirmationModal(){
    this.props.dispatch(AccountActions.hideEmailChangedPopup())
  }

  showEmailConfirmationModal(){
    this.props.dispatch(AccountActions.showEmailChangedPopup())
  }

  render() {
    const { user, tutor } = this.props;
    const {
      editProfileMode,
      showEmailConfirmationModal
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
  user: state.AccountReducer.user,
  student: state.StudentAccountReducer.student
})

export default connect(
  mapStateToProps
)(AccountProfileContainer)