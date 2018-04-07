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
  constructor(props) {
    super(props)
    this.state = {
      editProfileMode: false,
      showEmailConfirmationModal: false
    }
  }

  componentWillMount(){
    this.props.dispatch(StudentAccountActions.fetchUser())
  }

  showProfileEditForm(){
    this.setState({ editProfileMode: true })
  }

  hideProfileEditForm(){
    this.setState({ editProfileMode: false })
  }

  closeEmailConfirmationModal(){
    this.setState({ showEmailConfirmationModal: false })
  }

  render() {
    const { user, tutor } = this.props;
    const {
      editProfileMode,
      showEmailConfirmationModal
    } = this.state;
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