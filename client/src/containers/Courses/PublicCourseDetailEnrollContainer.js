import React, { Component} from 'react';
import cssModules from 'react-css-modules';
// import styles from '../Course.module.scss';
import {connect} from "react-redux";
import {Modal, Button} from 'react-bootstrap';
import * as PublicCourseActions from '../../actions/PublicCourseActionCreator';
import {globalHistory} from '../../utils/globalHistory'

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class PublicCourseDetailEnrollContainer extends Component {
  constructor(props) {
    super(props);
  }

  enrollCourse() {
    if (!this.props.user) {
      //Show require login modal
      this.showRequireLoginModal();
    } else {
      this.props.dispatch(PublicCourseActions.submitEnrollCourse(this.props.course.id))
      //Show enroll status modal
      this.showEnrollStatusModal();
    }
  }

  hideRequireLoginModal() {
      this.props.dispatch(PublicCourseActions.closePublicRequireLoginModal())
  }
  showRequireLoginModal() {
    this.props.dispatch(PublicCourseActions.showPublicRequireLoginModal(this.context.t('course_enroll_require_login_message')))
  }

  redirectToLogin() {
    this.hideRequireLoginModal()
    this.props.dispatch(PublicCourseActions.redirectAfterLogin('course/'+this.props.course.id))
  }

  hideEnrollStatusModal() {
    this.props.dispatch(PublicCourseActions.closePublicEnrollStatusModal())
  }
  showEnrollStatusModal() {
    this.props.dispatch(PublicCourseActions.showPublicEnrollStatusModal())
  }
  moveToPaymentPage() {
    // globalHistory.push('')
  }

  render() {
    let enrollMessage = null;
    let budgetButton = null;
    if (this.props.submit_enroll_success) {
      enrollMessage = <div className="alert alert-success">
        {this.context.t('course_enroll_success')}  
      </div>
    }
    if (this.props.submit_enroll_fail) {
      if (this.props.submit_enroll_errors.length > 0) {
        switch (this.props.submit_enroll_errors[0].status_code) {
          case 1://Exceed class limit
              enrollMessage = <div className="alert alert-danger">
                {this.props.submit_enroll_errors[0].message}
              </div>
            break;
          case 2://Not enough bubget
              enrollMessage = <div className="alert alert-danger">
                {this.props.submit_enroll_errors[0].message}
              </div>
              budgetButton = <Button onClick={this.moveToPaymentPage.bind(this)}>{this.context.t('course_enroll_deposit_more')}</Button>
            break;
          default:
            enrollMessage = <div className="alert alert-danger">
              {this.context.t('course_enroll_fail')}
            </div>
            break;
        }
      } else {
        enrollMessage = <div className="alert alert-danger">
          {this.context.t('course_enroll_fail')}
        </div>
      }
    }

    return (
      <div className="text-center">
        <Button className={'btn btn-primary'} onClick={this.enrollCourse.bind(this)}>
          <i className="fa fa-paper-plane-o"></i>
        </Button>

        {/* Require login modal */}
        <Modal show={this.props.show_require_login_modal} onHide={this.hideRequireLoginModal.bind(this)}>
          <Modal.Header>
            <Modal.Title>{this.context.t('course_enroll_require_login')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.require_login_message}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.redirectToLogin.bind(this)}>{this.context.t('ok')}</Button>
            <Button onClick={this.hideRequireLoginModal.bind(this)}>{this.context.t('close')}</Button>
          </Modal.Footer>
        </Modal>

        {/* Submit enroll course message */}
        <Modal show={this.props.show_enroll_status_modal} onHide={this.hideEnrollStatusModal.bind(this)}>
          <Modal.Header>
            <Modal.Title>{this.context.t('course_enroll_status')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {enrollMessage}
          </Modal.Body>
          <Modal.Footer>
            {budgetButton}
            <Button onClick={this.hideEnrollStatusModal.bind(this)}>{this.context.t('close')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

PublicCourseDetailEnrollContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PublicCourseDetailEnrollContainer.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    course: state.PublicCourseDetail.course,
    show_require_login_modal: state.PublicCourseDetail.show_require_login_modal,
    show_enroll_status_modal: state.PublicCourseDetail.show_enroll_status_modal,
    submit_enroll_success: state.PublicCourseDetail.submit_enroll_success,
    submit_enroll_fail: state.PublicCourseDetail.submit_enroll_fail,
    submit_enroll_errors: state.PublicCourseDetail.submit_enroll_errors,
    require_login_message: state.PublicCourseDetail.require_login_message
  }
}

export default connect(
  mapStateToProps
)(PublicCourseDetailEnrollContainer);
