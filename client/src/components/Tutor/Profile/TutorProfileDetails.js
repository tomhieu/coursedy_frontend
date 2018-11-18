import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorProfileDetails.module.scss';
import ChangePasswordContainer from '../../../containers/Account/ChangePasswordContainer';
import PersonInfoContainer from '../../../containers/Account/PersonInfoContainer';
import UserInfo from '../../Account/UserInfo';
import CoursedyWarning from '../../Core/CoursedyWarning/CoursedyWarning';
import {TutorStatus} from '../../../constants/TutorStatus';
import { UserRole } from 'constants/UserRole';

class TutorProfileDetails extends Component {
  hideProfileEditForm() {
    this.props.hideAccountEditForm();
  }

  showProfileEditForm() {
    this.props.showAccountEditForm();
  }

  render() {
    const { editProfileMode, user, tutor } = this.props;

    return (
      <div className="d-flex flex-vertical flex-auto">
        <div className="d-flex flex-vertical">
          <div className="title">
            {this.context.t('my_profile')}
          </div>
          {
            user.roles.indexOf(UserRole.TEACHER) >= 0 && tutor.status !== TutorStatus.VERIFIED ?
              <CoursedyWarning message={this.context.t('account_pending_warning_message', {
                pending_status: <strong>{this.context.t('pending_account_status')}</strong>
              })}></CoursedyWarning> : null
          }
        </div>
        <div className="d-flex flex-auto">
          <div className="dashboard-content-section">
            {
              editProfileMode
                ? <PersonInfoContainer cancel={this.hideProfileEditForm.bind(this)} />
                : <UserInfo user={user} showEditForm={this.showProfileEditForm.bind(this)} />
            }
          </div>
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
