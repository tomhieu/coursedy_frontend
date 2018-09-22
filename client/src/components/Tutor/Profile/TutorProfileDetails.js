import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { UserRole } from 'constants/UserRole';
import styles from './TutorProfileDetails.module.scss';
import ChangePasswordContainer from '../../../containers/Account/ChangePasswordContainer';
import PersonInfoContainer from '../../../containers/Account/PersonInfoContainer';
import UserInfo from '../../Account/UserInfo';
import LoadingMask from '../../../containers/LoadingMask/LoadingMask';


class TutorProfileDetails extends Component {
  hideProfileEditForm() {
    this.props.hideAccountEditForm();
  }

  showProfileEditForm() {
    this.props.showAccountEditForm();
  }

  render() {
    const { editProfileMode, user } = this.props;

    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex">
          <div className="title">
            {this.context.t('my_profile')}
          </div>
        </div>
        <div className="d-flex flex-auto">
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
        <div className="d-flex flex-auto">
          <div className="dashboard-content-section">
            <ChangePasswordContainer />
          </div>
        </div>
      </div>
    );
  }
}

TutorProfileDetails.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorProfileDetails.propTypes = {
  onUpdate: React.PropTypes.func.isRequired
};

export default cssModules(TutorProfileDetails, styles);
