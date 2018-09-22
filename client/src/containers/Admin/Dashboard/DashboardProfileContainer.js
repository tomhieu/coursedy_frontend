import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AccountActionCreator from 'actions/AccountActionCreator';
import { reduxForm } from 'redux-form';
import defaultAvatar from '../../../../images/default_avatar.png';
import LoadingMask from '../../LoadingMask/LoadingMask';
import CoursedyUploadImage from '../../../components/Core/CoursedyUploadImage/CoursedyUploadImage';

class DashboardProfileContainer extends Component {
  showEditAvatarForm() {
    this.props.showAvatarEditForm();
  }

  hideEditAvatarForm() {
    this.props.hideAvatarEditForm();
    this.props.avatarDeselected();
  }

  uploadAvatar(avatar) {
    this.props.updateAvatar(avatar);
    this.props.hideAvatarEditForm();
  }

  avatarSelected() {
    this.props.onSelectAvatar();
  }

  avatarDeselected() {
    this.props.onDeselectAvatar();
  }

  render() {
    const {
      user, userBalance, editAvatarMode, avatarSelected
    } = this.props;
    return (
      user
        ? (
          <LoadingMask
            placeholderId="userDetailsPlaceholder"
            normalPlaceholder={false}
            facebookPlaceholder
            loaderType="USER_DETAILS_PLACEHOLDER"
          >
            <div className="dashboard-profile text-center">
              <div className="row">
                <div className="col-md-4">
                  <CoursedyUploadImage
                    uploadCourseCoverImage={this.uploadAvatar.bind(this)}
                    closePopupToSelectImage={this.hideEditAvatarForm.bind(this)}
                    editImageLabel={this.context.t('update_avatar')}
                    onDeselectNewImage={this.avatarDeselected.bind(this)}
                    onSelectedNewImage={this.avatarSelected.bind(this)}
                    isSelectedNewImage={avatarSelected}
                    openPopupToSelectImage={this.showEditAvatarForm.bind(this)}
                    showPopupChangeImage={editAvatarMode}
                    fieldId="adminAvatarId"
                    isUserAvatar
                    previewImage={user.avatar ? user.avatar : defaultAvatar}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{user.name}</h4>
                </div>
              </div>
            </div>
          </LoadingMask>
        ) : null
    );
  }
}

const mapStateToProps = state => ({
  userBalance: state.session.userBalance,
  user: state.session.currentUser,
  editAvatarMode: state.AccountReducer.editAvatarMode,
  avatarSelected: state.AccountReducer.avatarSelected
});

const mapStateToDispatch = dispatch => ({
  updateAvatar: avatar => dispatch(AccountActionCreator.updateAvatar(avatar)),
  showAvatarEditForm: () => dispatch(AccountActionCreator.showAvatarEditForm()),
  hideAvatarEditForm: () => dispatch(AccountActionCreator.hideAvatarEditForm()),
  avatarDeselected: () => dispatch(AccountActionCreator.avatarDeselected()),
  onSelectAvatar: () => dispatch(AccountActionCreator.avatarSelected()),
  onDeselectAvatar: () => dispatch(AccountActionCreator.avatarDeselected())
});

DashboardProfileContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

DashboardProfileContainer.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default connect(
  mapStateToProps, mapStateToDispatch
)(reduxForm({
  form: 'updateAvatarForm',
  fields: ['avatar']
})(DashboardProfileContainer));
