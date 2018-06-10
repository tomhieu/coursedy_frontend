import React, {Component} from 'react';
import cssModules from 'react-css-modules';
// import styles from '../Course.module.scss';
import {Button, Modal} from 'react-bootstrap';
import {validate} from "../../../validations/CommonValidator";
import * as Actions from "../../../actions/PublicCourseActionCreator";
import PrimaryButton from "../Core/PrimaryButton/PrimaryButton";


/**
  * @Course group template 2
  * @Use for CoursePage
  */
class RequireLoginModal extends Component {
  constructor(props) {
    super(props);
  }

  hideRequireLoginModal() {
      this.props.dispatch(Actions.closePublicRequireLoginModal())
  }

  showRequireLoginModal() {
    this.props.dispatch(Actions.showPublicRequireLoginModal())
  }

  redirectToLogin() {
    this.hideRequireLoginModal()
    this.props.dispatch(Actions.redirectAfterLogin('course/'+this.props.course.id+'#comment-section'))
  }

  render() {
    const {handleSubmit, valid} = this.props;
    return (
      <Modal show={this.props.show_require_login_modal} onHide={this.hideRequireLoginModal.bind(this)}>
        <Modal.Header>
          <Modal.Title>{this.context.t('course_enroll_require_login')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.context.t('course_enroll_require_login_message')}
        </Modal.Body>
        <Modal.Footer>
          <PrimaryButton type="button" customClasses="button accept-button"
                         callback={this.redirectToLogin.bind(this)}
                         title={this.context.t('ok')}>
          </PrimaryButton>
          <PrimaryButton type="button" customClasses="button accept-button"
                         callback={this.hideRequireLoginModal.bind(this)}
                         title={this.context.t('close')}>
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    )
  }
}


RequireLoginModal.contextTypes = {
  t: React.PropTypes.func.isRequired
}

RequireLoginModal.propTypes = {
}

export default cssModules(RequireLoginModal, styles);