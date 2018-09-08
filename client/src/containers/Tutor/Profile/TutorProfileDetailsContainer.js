import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from 'actions/TutorProfileActionCreator';
import * as dashboardActions from 'actions/DashboardMenuActionCreator';
import { TutorProfileDetails } from '../../../components/index';
import * as AccountActions from '../../../actions/AccountActionCreator';
import { TutorNavigationTab } from '../../../constants/TutorNavigationTab';

class TutorProfileDetailsContainer extends Component {
  componentWillMount() {
    this.props.activateTab(TutorNavigationTab.PROFILE);
  }

  onUpdate(formData, onSuccess, onError) {
    this.props.updateDetailsTutor(this.props.tutor.id, formData, onSuccess, onError);
  }

  render() {
    return (
      <TutorProfileDetails {...this.props} onUpdate={this.onUpdate.bind(this)} />
    );
  }
}

TutorProfileDetailsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.session.currentUser,
  editProfileMode: state.AccountReducer.editProfileMode,
  tutor: state.TutorProfile.tutor
});

const mapDispatchToProps = dispatch => ({
  activateTab: tabId => dispatch(dashboardActions.activateTab(tabId)),
  updateDetailsTutor: (tutorId, formData, onSuccess, onError) => dispatch(Actions.updateTutor(tutorId, formData, onSuccess, onError)),
  showAccountEditForm: () => dispatch(AccountActions.showAccountEditForm()),
  hideAccountEditForm: () => dispatch(AccountActions.hideAccountEditForm()),
  hideEmailChangedPopup: () => dispatch(AccountActions.hideEmailChangedPopup()),
  showEmailChangedPopup: () => dispatch(AccountActions.showEmailChangedPopup())
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TutorProfileDetailsContainer);
