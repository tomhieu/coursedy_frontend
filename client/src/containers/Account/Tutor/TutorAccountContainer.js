import React, { Component } from 'react';
import { connect } from 'react-redux';
import Network from 'utils/network';
import TutorDetail from 'components/Dashboard/Tutors/TutorDetail';
import TutorEducationListContainer from 'containers/Dashboard/Tutors/Educations/TutorEducationListContainer';
import TutorWorkExperienceListContainer from 'containers/Dashboard/Tutors/WorkExperiences/TutorWorkExperienceListContainer';
import Certificate from './Certificate';
import TutorForm from '../../Dashboard/Tutors/TutorForm';

import { AccountActions, TutorAccountActions } from '../../../actions/index';
import { RequireEmailConfirmationModal } from '../../../components/index';
import LoadingMask from '../../LoadingMask/LoadingMask';
import { FETCH_TUTOR_DATA } from '../../../constants/Session';
import { CERTIFICATE, FETCH_TEACHER_SKILL_SET } from '../../../actions/AsyncActionCreator';
import * as dashboardActions from '../../../actions/DashboardMenuActionCreator';
import { TutorNavigationTab } from '../../../constants/TutorNavigationTab';
import CoursedyWarning from '../../../components/Core/CoursedyWarning/CoursedyWarning';

class TutorAccount extends Component {
  componentWillMount() {
    this.props.loadListSkillData();
    this.props.loadDegrees();
    this.props.activateTab(TutorNavigationTab.ACCOUNT_SETTING);
  }

  showEducationEditForm() {
    this.props.showEducationEditForm();
  }

  hideEducationEditForm() {
    this.props.hideEducationEditForm();
  }

  closeEmailConfirmationModal() {
    this.props.hideEmailChangedPopup();
  }

  showEmailConfirmationModal() {
    this.props.showEmailChangedPopup();
  }

  render() {
    const { tutor } = this.props;
    const { editEducationMode } = this.props;
    if (!tutor.id) {
      return null;
    }
    return (
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <div className="title">
            {this.context.t('account_setting')}
          </div>
          <CoursedyWarning message={this.context.t('account_pending_warning_message', {
            pending_status: <strong>{this.context.t('pending_account_status')}</strong>
          })}></CoursedyWarning>
        </div>
        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="dashboard-content-section">
            {
              editEducationMode
                ? <TutorForm tutor={tutor} cancel={this.hideEducationEditForm.bind(this)} />
                : <TutorDetail tutor={tutor} showEditForm={this.showEducationEditForm.bind(this)} />
            }
          </div>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="dashboard-content-section">
            <TutorEducationListContainer />
          </div>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <div className="dashboard-content-section">
            <TutorWorkExperienceListContainer />
          </div>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <LoadingMask
            placeholderId="userCertificatePlaceholder"
            normalPlaceholder={false}
            facebookPlaceholder
            loaderType="USER_CERTIFICATE_PLACEHOLDER"
          >
            <div className="dashboard-content-section">
              <Certificate />
            </div>
          </LoadingMask>
        </div>

        <div className="col-md-12 col-xs-12 col-sm-12">
          <RequireEmailConfirmationModal close={this.closeEmailConfirmationModal.bind(this)} show={this.props.showEmailConfirmationModal} />
        </div>
      </div>
    );
  }
}

TutorAccount.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  editPasswordMode: state.AccountReducer.editPasswordMode,
  user: state.session.currentUser,
  tutor: state.TutorAccountReducer.tutor,
  editProfileMode: state.AccountReducer.editProfileMode,
  editEducationMode: state.TutorAccountReducer.editEducationMode,
  showEmailConfirmationModal: state.AccountReducer.showEmailConfirmationModal
});

const mapDispatchToProps = dispatch => ({
  loadListSkillData: () => dispatch({
    type: FETCH_TEACHER_SKILL_SET,
    payload: Network().get('categories'),
    meta: 'userEducationPlaceholder'
  }),
  loadDegrees: () => dispatch({
    type: CERTIFICATE.load_tutor_certificate_list,
    payload: Network().get('degrees'),
    meta: 'userCertificatePlaceholder'
  }),
  showAccountEditForm: () => dispatch(AccountActions.showAccountEditForm()),
  showEducationEditForm: () => dispatch(TutorAccountActions.showEducationEditForm()),
  hideAccountEditForm: () => dispatch(AccountActions.hideAccountEditForm()),
  hideEducationEditForm: () => dispatch(TutorAccountActions.hideEducationEditForm()),
  hideEmailChangedPopup: () => dispatch(AccountActions.hideEmailChangedPopup()),
  showEmailChangedPopup: () => dispatch(AccountActions.showEmailChangedPopup()),
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TutorAccount);
