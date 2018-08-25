import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AccountActionCreator from 'actions/AccountActionCreator';
import { reduxForm } from 'redux-form';
import ObjectUtils from '../../../../utils/ObjectUtils';
import defaultAvatar from '../../../../../images/default_avatar.png';
import LoadingMask from '../../../../components/LoadingMask/LoadingMask';
import CoursedyUploadImage from '../../../../components/Core/CoursedyUploadImage/CoursedyUploadImage';

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
      user ? (
        <LoadingMask
          placeholderId="userDetailsPlaceholder"
          normalPlaceholder={false}
          facebookPlaceholder
          loaderType="USER_DETAILS_PLACEHOLDER"
        >
          <div className="dashboard-profile">
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
                  previewImage={user.avatar ? user.avatar : defaultAvatar}
                  fieldId="tutor_avatar"
                  isUserAvatar
                  {...this.props}
                />
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-sm-12 user-name">
                    <h4>{user.name}</h4>
                  </div>
                  <div className="col-sm-12 sub-title">
                    <p>
                      {this.context.t('my_balance')}
:
                      {' '}
                      <strong>{ObjectUtils.currencyFormat(user.balance)}</strong>
                    </p>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-sm-12 user-name">
                      <h4>{user.name}</h4>
                    </div>
                    <div className="col-sm-12 sub-title">
                      <p>
                        {this.context.t('my_balance')}
:
                        {' '}
                        <strong>{ObjectUtils.currencyFormat(userBalance)}</strong>
                      </p>
                    </div>
                  </div>
                </div>
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
