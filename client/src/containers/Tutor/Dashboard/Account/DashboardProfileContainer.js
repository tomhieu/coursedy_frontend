import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  PaymentActions
} from '../../../../actions/index'
import ObjectUtils from '../../../../utils/ObjectUtils'
import {UserAvatarForm} from "components/Account/UserAvatarForm";
import * as AccountActionCreator from 'actions/AccountActionCreator'
import {reduxForm} from "redux-form";
import {validate} from "../../../../validations/ChangePasswordFormValidator";
import defaultAvatar from '../../../../../images/default_avatar.png'
import {SERVER_NAME} from "utils/CommonConstant";
import {Modal, ModalHeader, Button, ModalBody, ModalFooter} from 'reactstrap';

class DashboardProfileContainer extends Component {
  componentWillMount() {
    this.props.dispatch(AccountActionCreator.fetchUser())
    this.props.dispatch(PaymentActions.fetchUserBalance())
  }

  showEditAvatarForm() {
    this.props.dispatch(AccountActionCreator.showAvatarEditForm())
  }

  hideEditAvatarForm() {
    this.props.dispatch(AccountActionCreator.hideAvatarEditForm())
    this.props.dispatch(AccountActionCreator.avatarDeselected())
  }

  uploadAvatar(avatar) {
    this.props.dispatch(AccountActionCreator.updateAvatar(avatar))
    this.props.dispatch(AccountActionCreator.hideAvatarEditForm())
  }

  avatarSelected() {
    this.props.dispatch(AccountActionCreator.avatarSelected())
  }

  avatarDeselected() {
    this.props.dispatch(AccountActionCreator.avatarDeselected())
  }

  render() {
    const {user, userBalance, editAvatarMode, avatarSelected} = this.props
    return (
      user ?
        <div className="dashboard-profile text-center">
          <div className="row">
            {this.renderAvatar(user, editAvatarMode, avatarSelected)}
            <div className="col-sm-12">
              <h4>{user.name}</h4>
            </div>
            <div className='col-sm-12'>
              <p>{this.context.t('my_balance')}: <strong>{ObjectUtils.currencyFormat(userBalance)}</strong></p></div>
          </div>
        </div> : null
    )
  }

  renderAvatar(currentUser, editAvatarMode, avatarSelected) {
    return (
      <div className="col-sm-12 mb-15 avatar-container">
        <figure className="imghvr-zoom-in">
          <img className="media-object full-width"
               src={currentUser.avatar ? currentUser.avatar : defaultAvatar}
               alt={currentUser.name}
          />
        </figure>
        <span className='edit-avatar-btn' onClick={this.showEditAvatarForm.bind(this)}>
          <span className='base-line-btn'>
            <i className='fa fa-camera'/>
            <span className='ml-10'>{this.context.t('update_avatar')}</span>
          </span>
        </span>
        <Modal isOpen={editAvatarMode} onClosed={this.hideEditAvatarForm.bind(this)}>
          <ModalBody>
            <UserAvatarForm onSubmit={this.uploadAvatar.bind(this)}
                            cancel={this.hideEditAvatarForm.bind(this)} {...this.props}
                            avatarSelected={avatarSelected}
                            selectAvatar={this.avatarSelected.bind(this)}
                            deselectAvatar={this.avatarDeselected.bind(this)}
            />
          </ModalBody>
        </Modal>
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

DashboardProfileContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

DashboardProfileContainer.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'updateAvatarForm',
  fields: ['avatar']
})(DashboardProfileContainer))
