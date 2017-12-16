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
      this.props.dispatch(PublicCourseActions.closePublishRequireLoginModal())
  }
  showRequireLoginModal() {
    this.props.dispatch(PublicCourseActions.showPublishRequireLoginModal())
  }

  redirectToLogin() {
    this.hideRequireLoginModal()
    this.props.dispatch(PublicCourseActions.redirectEnrollCourse(this.props.course.id))
  }

  hideEnrollStatusModal() {
      this.props.dispatch(PublicCourseActions.closePublishEnrollStatusModal())
  }
  showEnrollStatusModal() {
    this.props.dispatch(PublicCourseActions.showPublishEnrollStatusModal())
  }


  render() {
    let enrollMessage = null;
    if (this.props.submit_enroll_success) {
      enrollMessage = <div className="alert alert-success">
        {this.context.t('course_enroll_success')}  
      </div>
    }
    if (this.props.submit_enroll_fail) {
      enrollMessage = <div className="alert alert-danger">
        {this.context.t('course_enroll_fail')}
      </div>
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
            {this.context.t('course_enroll_require_login_message')}
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
  }
}

export default connect(
  mapStateToProps
)(PublicCourseDetailEnrollContainer);
