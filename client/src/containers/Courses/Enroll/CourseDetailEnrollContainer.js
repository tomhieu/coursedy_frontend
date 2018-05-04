import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseDetailEnrollContainer.scss';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import * as Actions from 'actions/PublicCourseActionCreator';
import { globalHistory } from '../../../utils/globalHistory';
import SimpleDialogComponent from "../../../components/Core/SimpleDialogComponent";


/**
 * @Course group template 2
 * @Use for CoursePage
 */
class CourseDetailEnrollContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show_require_login_modal: false,
      show_enroll_status_modal: false
    }
  }

  componentWillMount() {
  }

  submitEnrollCourse() {
    if (!this.props.user) {
      //Show require login modal
      this.showRequireLoginModal();
    } else {
      this.props.dispatch(Actions.submitEnrollCourse(this.props.course.id));
      //Show enroll status modal
      this.showEnrollCourseStatusModal();
    }
  }

  hideRequireLoginModal() {
    this.setState({
      show_require_login_modal: false
    })
  }

  showRequireLoginModal() {
    this.setState({
      show_require_login_modal: true
    })
  }

  redirectToLogin() {
    this.hideRequireLoginModal()
    this.props.dispatch(Actions.redirectAfterLogin('course/'+this.props.course.id))
  }

  hideEnrollCourseStatusModal() {
    this.setState({
      show_enroll_status_modal: false
    })
  }

  showEnrollCourseStatusModal() {
    this.setState({
      show_enroll_status_modal: true
    })
  }

  moveToPaymentPage() {
    // globalHistory.push('')
  }

  render() {
    const { show_require_login_modal, show_enroll_status_modal } = this.state
    let enrollMessage = null;
    let budgetButton = null;
    if (this.props.submit_enroll_success) {
      enrollMessage = <div>
        {this.context.t('course_enroll_success')}
      </div>;
    }
    if (this.props.submit_enroll_fail) {
      if (this.props.submit_enroll_errors.length > 0) {
        switch (this.props.submit_enroll_errors[0].status_code) {
          case 1://Exceed class limit
            enrollMessage = <div>
              {this.props.submit_enroll_errors[0].message}
            </div>;
            break;
          case 2://Not enough bubget
            enrollMessage = <div>
              {this.props.submit_enroll_errors[0].message}
            </div>;
            budgetButton = <Button
              onClick={this.moveToPaymentPage.bind(this)}>{this.context.t('course_enroll_deposit_more')}</Button>;
            break;
          default:
            enrollMessage = <div>
              {this.context.t('course_enroll_fail')}
            </div>;
            break;
        }
      } else {
        enrollMessage = <div>
          {this.context.t('course_enroll_fail')}
        </div>;
      }
    }

    return (
      <div>
        <div className="text-center">
          <a onClick={this.submitEnrollCourse.bind(this)} className="btn btn-primary btn-block btn-md">{this.context.t('course_enroll')}</a>
        </div>

        {/* Require login modal */}
        <SimpleDialogComponent 
          title={this.context.t('require_login')}
          show={show_require_login_modal}
          acceptLabel={this.context.t('ok')}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideRequireLoginModal.bind(this)}
          acceptCallback={this.redirectToLogin.bind(this)}
        >
          {this.context.t('course_enroll_require_login_message')}
        </SimpleDialogComponent>

        {/* Enroll course status modal */}
        <SimpleDialogComponent 
          title={this.context.t('course_enroll_status')}
          show={show_enroll_status_modal}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideEnrollCourseStatusModal.bind(this)}
        >
          {enrollMessage}
        </SimpleDialogComponent>
      </div>
    );
  }
}


CourseDetailEnrollContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseDetailEnrollContainer.propTypes = {};

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    course: state.PublicCourseDetail.course,
    // show_require_login_modal: state.PublicCourseDetail.show_require_login_modal,
    // show_enroll_status_modal: state.PublicCourseDetail.show_enroll_status_modal,
    submit_enroll_success: state.PublicCourseDetail.submit_enroll_success,
    submit_enroll_fail: state.PublicCourseDetail.submit_enroll_fail,
    submit_enroll_errors: state.PublicCourseDetail.submit_enroll_errors,
    // require_login_message: state.PublicCourseDetail.require_login_message
  };
};

export default connect(mapStateToProps)(cssModules(CourseDetailEnrollContainer, styles));
