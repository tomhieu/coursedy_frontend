import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import * as Actions from '../../../actions/PublicCourseActionCreator';
import { CoreComponent } from '../../../components/index';
import { validate } from '../../../validations/PublicCourseDetailFollowModalValidator';
import SimpleDialogComponent from '../../../components/Core/SimpleDialogComponent';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetailFollowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_require_login_modal: false,
      show_follow_status_modal: false
    };
  }

  hidePublicCourseFollowModal() {
    this.props.dispatch(Actions.closePublicCourseFollowModal());
  }

  submitFollowCourse() {
    if (!this.props.user) {
      this.showRequireLoginModal();
    } else {
      // Submit follow course
      this.props.dispatch(Actions.submitFollowCourse([this.props.course.id]));
      // Show follow course status
      this.showCourseFollowStatusModal();
    }
  }

  hideCourseFollowStatusModal() {
    this.setState({
      show_follow_status_modal: false
    });
  }

  showCourseFollowStatusModal() {
    this.setState({
      show_follow_status_modal: true
    });
  }

  hideRequireLoginModal() {
    this.setState({
      show_require_login_modal: false
    });
  }

  showRequireLoginModal() {
    this.setState({
      show_require_login_modal: true
    });
  }

  redirectToLogin() {
    this.hideRequireLoginModal();
    this.props.dispatch(Actions.redirectAfterLogin(`course/${this.props.course.id}`));
  }

  render() {
    const { handleSubmit, valid } = this.props;
    const { show_require_login_modal, show_follow_status_modal } = this.state;

    return (
      <div>
        <a onClick={this.submitFollowCourse.bind(this)} className="favor-link">
          <i className="fa fa-heart-o" />
          {' '}
          {this.context.t('course_follow')}
        </a>

        {/* Require login modal */}
        <SimpleDialogComponent
          title={this.context.t('require_login')}
          show={show_require_login_modal}
          acceptLabel={this.context.t('ok')}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideRequireLoginModal.bind(this)}
          acceptCallback={this.redirectToLogin.bind(this)}
        >
          {this.context.t('course_follow_require_login_message')}
        </SimpleDialogComponent>

        {/* Follow course status modal */}
        <SimpleDialogComponent
          title={this.context.t('course_follow_status')}
          show={show_follow_status_modal}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideCourseFollowStatusModal.bind(this)}
        >
          {
            this.props.submit_follow_success ? (
              <div>
                {this.context.t('course_follow_submit_success')}
              </div>
            ) : null
          }
          {
            this.props.submit_follow_fail ? (
              <div>
                {this.context.t('course_follow_submit_fail')}
              </div>
            ) : null
          }
        </SimpleDialogComponent>

      </div>
    );
  }
}

CourseDetailFollowContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetailFollowContainer.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    course: state.PublicCourseDetail.course,
    submit_follow_success: state.PublicCourseDetail.submit_follow_success,
    submit_follow_fail: state.PublicCourseDetail.submit_follow_fail,
  };
};

export default connect(
  mapStateToProps
)(CourseDetailFollowContainer);
