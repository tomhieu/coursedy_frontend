import * as React from "react";
import {Component} from "react";
import SimpleDialogComponent from "../../Core/SimpleDialogComponent";
import {SecurityUtils} from "utils/SecurityUtils";
import {globalHistory} from "utils/globalHistory";

class UpcommingCourseNotificationPopup extends Component {

  openCourseDetails(courseUrl) {
    this.props.closePopupJoinUpcomingClass();
    globalHistory.push(courseUrl);
  }

  getCourseDetailsLink(user, courseId, courseName) {
    let courseDetailUrl = `courses/${courseId}`;
    if (SecurityUtils.isTeacher(user)) {
      courseDetailUrl = `/dashboard/courses/detail/${courseId}`;
    }
    return <a onClick={this.openCourseDetails.bind(this, courseDetailUrl)} className="link-course-details" >{courseName}</a>
  }



  render() {
    const {currentUser, courseId, courseName, teacherName, isShowPopup,
      classRoomId, acceptJoinToClassRoom, closePopupJoinUpcomingClass} = this.props;
    return (
      <SimpleDialogComponent show={isShowPopup}
                             title={this.context.t('join_active_course_popup_title')}
                             acceptCallback={acceptJoinToClassRoom.bind(this, classRoomId)}
                             cancelCallback={closePopupJoinUpcomingClass.bind(this)}>
        {
          SecurityUtils.isStudent(currentUser) ?
          this.context.t('join_active_course_popup_message', {
              courseName: this.getCourseDetailsLink(currentUser, courseId, courseName),
              teacherName: <strong>{teacherName}</strong>
            }) :
          this.context.t('join_active_course_popup_message_for_teacher', {
            courseName: this.getCourseDetailsLink(currentUser, courseId, courseName)
          })
        }
      </SimpleDialogComponent>
    )
  }
}

UpcommingCourseNotificationPopup.contextTypes = {
  t: React.PropTypes.func.isRequired,
};

UpcommingCourseNotificationPopup.propTypes = {
  currentUser: React.PropTypes.object,
  courseId: React.PropTypes.number,
  courseName: React.PropTypes.string,
  teacherName: React.PropTypes.string,
  isShowPopup: React.PropTypes.bool,
  classRoomId: React.PropTypes.string,
  acceptJoinToClassRoom: React.PropTypes.func,
  closePopupJoinUpcomingClass: React.PropTypes.func
};

export default UpcommingCourseNotificationPopup;

