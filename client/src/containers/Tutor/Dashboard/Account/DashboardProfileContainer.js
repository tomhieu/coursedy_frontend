import React, {Component} from 'react'
import {connect} from 'react-redux'
import ObjectUtils from '../../../../utils/ObjectUtils'
import {UserAvatarForm} from "components/Account/UserAvatarForm";
import * as AccountActionCreator from 'actions/AccountActionCreator'
import {reduxForm} from "redux-form";
import defaultAvatar from '../../../../../images/default_avatar.png'
import {SERVER_NAME} from "utils/CommonConstant";
import LoadingMask from "../../../../components/LoadingMask/LoadingMask";
import {FETCH_CURRENT_USER, FETCH_TUTOR_DATA} from "../../../../constants/Session";
import Network from "utils/network";
import {FETCH_USER_BALANCE} from "../../../../actions/AsyncActionCreator";

class DashboardProfileContainer extends Component {
  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchUserBalance();
  }

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
    this.props.avatarSelected();
  }

  avatarDeselected() {
    this.props.avatarDeselected();
  }

  render() {
    const {user, userBalance, editAvatarMode, avatarSelected} = this.props
    return (
      user ?
        <LoadingMask placeholderId="userDetailsPlaceholder"
                     normalPlaceholder={false}
                     facebookPlaceholder={true}
                     loaderType="USER_DETAILS_PLACEHOLDER">
          <div className="dashboard-profile text-center">
            <div className="row">
              {this.renderAvatar(user, editAvatarMode, avatarSelected)}
              <div className="col-sm-12">
                <h4>{user.name}</h4>
              </div>
              <div className='col-sm-12'>
                <p>{this.context.t('my_balance')}: <strong>{ObjectUtils.currencyFormat(userBalance)}</strong></p></div>
            </div>
          </div>
        </LoadingMask>: null
    )
  }

  renderAvatar(currentUser, editAvatarMode, avatarSelected) {
    if (editAvatarMode) {
      return (
        <div className="col-sm-12">
          <UserAvatarForm onSubmit={this.uploadAvatar.bind(this)}
                          cancel={this.hideEditAvatarForm.bind(this)} {...this.props}
                          avatarSelected={avatarSelected}
                          selectAvatar={this.avatarSelected.bind(this)}
                          deselectAvatar={this.avatarDeselected.bind(this)}
          />
        </div>
      )
    }

    return (
      <div className="col-sm-12 mb-15 avatar-container">
        <figure className="imghvr-zoom-in">
          <img className="media-object img-circle full-width"
               src={currentUser.avatar ? (SERVER_NAME + currentUser.avatar) : defaultAvatar}
               alt={currentUser.name}
          />
        </figure>
        <span className='edit-avatar-btn' onClick={this.showEditAvatarForm.bind(this)}>
          <span className='base-line-btn'>
            <i className='fa fa-camera'/>
            <span className='ml-10'>{this.context.t('update_avatar')}</span>
          </span>
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userBalance: state.session.userBalance,
  user: state.AccountReducer.user,
  editAvatarMode: state.AccountReducer.editAvatarMode,
  avatarSelected: state.AccountReducer.avatarSelected
})

const mapStateToDispatch = (dispatch) => ({
  fetchUser: () => dispatch({
    type: FETCH_CURRENT_USER,
    payload: Network().get('current_user').then((res) => dispatch({
      type: FETCH_TUTOR_DATA,
      payload: Network().get('tutors/tutor_by_user', {user_id: res.id}),
      meta: 'userDetailsPlaceholder'
    })),
    meta: 'userDetailsPlaceholder'
  }),
  fetchUserBalance: () => dispatch({
    type: FETCH_USER_BALANCE,
    payload: 0,
    meta: 'userDetailsPlaceholder'
  }),
  updateAvatar: (avatar) => dispatch(AccountActionCreator.updateAvatar(avatar)),
  showAvatarEditForm: () => dispatch(AccountActionCreator.showAvatarEditForm()),
  hideAvatarEditForm: () => dispatch(AccountActionCreator.hideAvatarEditForm()),
  avatarDeselected: () => dispatch(AccountActionCreator.avatarDeselected()),
  avatarSelected: () => dispatch(AccountActionCreator.avatarSelected()),
  avatarDeselected: () => dispatch(AccountActionCreator.avatarDeselected())
})

DashboardProfileContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

DashboardProfileContainer.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default connect(
  mapStateToProps, mapStateToDispatch
)(reduxForm({
  form: 'updateAvatarForm',
  fields: ['avatar']
})(DashboardProfileContainer))
