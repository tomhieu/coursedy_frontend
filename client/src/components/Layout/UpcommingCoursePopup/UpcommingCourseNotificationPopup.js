import * as React from 'react';
import {Component} from 'react';
import {SecurityUtils} from 'utils/SecurityUtils';
import {globalHistory} from 'utils/globalHistory';
import Modal from 'react-bootstrap4-modal';
import Network from '../../../utils/network';
import "babel-polyfill"

class UpcommingCourseNotificationPopup extends Component {
  constructor() {
    super();
  }
  openCourseDetails(courseUrl) {
    this.props.closePopupJoinUpcomingClass();
    globalHistory.push(courseUrl);
  }

  getCourseDetailsLink(user, courseId, courseName) {
    let courseDetailUrl = `courses/${courseId}`;
    if (SecurityUtils.isTeacher(user)) {
      courseDetailUrl = `/dashboard/courses/detail/${courseId}`;
    }
    return <a onClick={this.openCourseDetails.bind(this, courseDetailUrl)} className="link-course-details">{courseName}</a>;
  }
/**
  async componentDidMount() {
    const classRoomId = this.props.classRoomId;
    const bbbUrl = await Network().get(`rooms/${classRoomId}/join`, {}, true);
    this.setState({
      urlJoiningToBBBClass: bbbUrl.url
    });
  }
 */

  render() {
    const {
      currentUser, courseId, courseName, teacherName, closePopupJoinUpcomingClass, acceptJoinToClassRoom, classRoomId
    } = this.props;

    const canShowPopup = classRoomId !== null;
    return (
      <Modal visible={canShowPopup} onClickBackdrop={closePopupJoinUpcomingClass.bind(this)} >
        <div className="modal-header">
          <h5 className="modal-title">{this.context.t('join_active_course_popup_title')}</h5>
        </div>
        <div className="modal-body">
          {
            SecurityUtils.isStudent(currentUser)
              ? this.context.t('join_active_course_popup_message', {
                courseName: this.getCourseDetailsLink(currentUser, courseId, courseName),
                teacherName: <strong>{teacherName}</strong>
              })
              : this.context.t('join_active_course_popup_message_for_teacher', {
                courseName: this.getCourseDetailsLink(currentUser, courseId, courseName)
              })
          }
        </div>
        <div className="modal-footer button-center justify-content-center">
          <a className="join-to-class-link" onClick={acceptJoinToClassRoom.bind(this, classRoomId)} target="_blank">
            {this.context.t('join_to_class_button_name')}
          </a>
        </div>
      </Modal>
    )
  }
}

UpcommingCourseNotificationPopup.contextTypes = {
  t: React.PropTypes.func.isRequired,
};

UpcommingCourseNotificationPopup.propTypes = {
  currentUser: React.PropTypes.object,
  courseId: React.PropTypes.string,
  courseName: React.PropTypes.string,
  teacherName: React.PropTypes.string,
  classRoomId: React.PropTypes.string,
  acceptJoinToClassRoom: React.PropTypes.func,
  closePopupJoinUpcomingClass: React.PropTypes.func
};

export default UpcommingCourseNotificationPopup;
