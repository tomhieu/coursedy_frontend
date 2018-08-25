import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserInfo } from 'components/index';
import ChangePasswordContainer from '../../Account/ChangePasswordContainer';
import PersonInfoContainer from '../../Account/PersonInfoContainer';

import {
  AccountActions,
  TutorAccountActions
} from '../../../actions/index';
import {
  RequireEmailConfirmationModal
} from '../../../components/index';
import LoadingMask from '../../../components/LoadingMask/LoadingMask';
import * as dashboardActions from '../../../actions/DashboardMenuActionCreator';

class AccountProfileContainer extends Component {
  componentDidMount() {
    this.props.activateTab('my_profile');
  }

  showProfileEditForm() {
    this.props.showAccountEditForm();
  }

  hideProfileEditForm() {
    this.props.hideAccountEditForm();
  }

  closeEmailConfirmationModal() {
    this.props.hideEmailChangedPopup();
  }

  showEmailConfirmationModal() {
    this.props.showEmailChangedPopup();
  }

  render() {
    const { user } = this.props;
    const { editProfileMode } = this.props;
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12 col-sm-12 ">
          <LoadingMask
            placeholderId="userAccountPlaceholder"
            normalPlaceholder={false}
            facebookPlaceholder
            loaderType="USER_ACCOUNT_PLACEHOLDER"
          >
            <div className="dashboard-content-section">
              {
                  editProfileMode
                    ? <PersonInfoContainer cancel={this.hideProfileEditForm.bind(this)} />
                    : <UserInfo user={user} showEditForm={this.showProfileEditForm.bind(this)} />
                }
            </div>
          </LoadingMask>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="dashboard-content-section">
            <ChangePasswordContainer />
          </div>
        </div>
        <div className="col-md-12 col-xs-12 col-sm-12">
          <RequireEmailConfirmationModal close={this.closeEmailConfirmationModal.bind(this)} show={this.props.showEmailConfirmationModal} />
        </div>
      </div>
    );
  }
}

AccountProfileContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editPasswordMode: state.AccountReducer.editPasswordMode,
  user: state.session.currentUser,
  editProfileMode: state.AccountReducer.editProfileMode,
  showEmailConfirmationModal: state.AccountReducer.showEmailConfirmationModal
});

const mapDispatchToProps = dispatch => ({
  showAccountEditForm: () => dispatch(AccountActions.showAccountEditForm()),
  hideAccountEditForm: () => dispatch(AccountActions.hideAccountEditForm()),
  hideEmailChangedPopup: () => dispatch(AccountActions.hideEmailChangedPopup()),
  showEmailChangedPopup: () => dispatch(AccountActions.showEmailChangedPopup()),
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(AccountProfileContainer);
