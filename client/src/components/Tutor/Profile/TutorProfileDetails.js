import React, {Component} from 'react';
import * as Actions from '../../../actions/TutorProfileActionCreator'
import cssModules from 'react-css-modules';
import styles from './TutorProfileDetails.module.scss';
import ChangePasswordContainer from "../../../containers/Account/ChangePasswordContainer";
import PersonInfoContainer from "../../../containers/Account/PersonInfoContainer";
import UserInfo from "../../Account/UserInfo";
import {connect} from "react-redux";
import LoadingMask from "../../LoadingMask/LoadingMask";
import * as AccountActions from "../../../actions/AccountActionCreator";
import * as TutorAccountActions from "../../../actions/Tutor/Account/TutorAccountActionCreator";


class TutorProfileDetails extends Component {
  componentWillMount() {
    this.props.dispatch(Actions.fetchTutor())
  }

  hideProfileEditForm(){
    this.props.hideAccountEditForm();
  }

  showProfileEditForm(){
    this.props.showAccountEditForm();
  }

  render() {
    const {editProfileMode, user} = this.props

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
          <div className="dashboard-content-section">
            <ChangePasswordContainer/>
          </div>
        </div>
      </div>
    )
  }
}

TutorProfileDetails.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorProfileDetails.propTypes = {
  onUpdate: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.session.currentUser,
  editProfileMode: state.AccountReducer.editProfileMode
});

const mapDispatchToProps = (dispatch) => ({
  showAccountEditForm: () => dispatch(AccountActions.showAccountEditForm()),
  hideAccountEditForm: () => dispatch(AccountActions.hideAccountEditForm()),
  hideEmailChangedPopup: () => dispatch(AccountActions.hideEmailChangedPopup()),
  showEmailChangedPopup: () => dispatch(AccountActions.showEmailChangedPopup())
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(cssModules(TutorProfileDetails, styles));