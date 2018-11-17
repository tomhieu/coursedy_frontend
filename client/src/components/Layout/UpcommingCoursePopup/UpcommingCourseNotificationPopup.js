import * as React from 'react';
import {Component} from 'react';
import {SecurityUtils} from 'utils/SecurityUtils';
import {globalHistory} from 'utils/globalHistory';
import "babel-polyfill"
import FormField from '../../Core/FormField';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';
import SimpleDialogComponent from '../../Core/SimpleDialogComponent';

class UpcommingCourseNotificationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerminateLessonPopup: false
    };
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

  openRoomExpirationWarning() {
    this.setState({
      showTerminateLessonPopup: true
    });
  }

  closeTerminateLesson() {
    this.setState({
      showTerminateLessonPopup: false
    });
  }

  terminateLesson(lessonId) {
    this.props.terminateLesson(lessonId);
    this.closeTerminateLesson();
  }

  render() {
    const { currentUser, teachingCourse, selectedLessonId, isExpiredLesson } = this.props;
    const teacherName = teachingCourse !== null ? teachingCourse.user.name : '';
    const courseName = teachingCourse !== null ? teachingCourse.title : '';
    const courseId = teachingCourse !== null ? teachingCourse.id : '';
    const lessons = teachingCourse !== null ? teachingCourse.lessons : [];
    const selectedLesson = lessons.find(le => le.id === Number(selectedLessonId));

    return (
      <div>
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
        {
          selectedLesson ? <div className="selected-lesson">
            <div>{this.context.t('bbb_selected_lesson', {lessonName: <strong>{selectedLesson.title}</strong>})}</div>
          </div> : null
        }
        {
          isExpiredLesson ?
            <div className="d-flex flex-row align-items-center lesson-warning">
              <div className="terminate-lesson">{this.context.t('lesson_expiration_message')}</div>
              <PrimaryButton isSmallButton={true} round line={false}
                             iconButton={true}
                             customClasses="start-course-btn"
                             callback={this.openRoomExpirationWarning.bind(this)}
                             title={this.context.t('lesson_room_is_expired_title')} />
            </div>: null
        }
        <FormField
          fieldId="selectedLesson"
          fieldLabel={this.context.t('bbb_change_lesson_title')}
          placeholder={this.context.t('bbb_change_lesson_title')}
          options={lessons.map((lesson) => {
            return { id: lesson.id, text: lesson.title };
          })}
          formControlName="selectedLesson"
          typeField="custom_select"
        />
        {
          selectedLesson ?
            <SimpleDialogComponent show={this.state.showTerminateLessonPopup}
                                   title={this.context.t('lesson_room_is_expired_title')}
                                   acceptCallback={this.terminateLesson.bind(this, selectedLesson.id)}
                                   cancelCallback={this.closeTerminateLesson.bind(this)}>
              <span>{this.context.t('termination_lesson_confirmation')}</span>
            </SimpleDialogComponent> : null
        }
      </div>
    )
  }
}

UpcommingCourseNotificationPopup.contextTypes = {
  t: React.PropTypes.func.isRequired,
};

UpcommingCourseNotificationPopup.propTypes = {
  currentUser: React.PropTypes.object,
  teachingCourse: React.PropTypes.object,
  selectedLessonId: React.PropTypes.string,
  lesson: React.PropTypes.object,
  teacherName: React.PropTypes.string,
  acceptJoinToClassRoom: React.PropTypes.func,
  closePopupJoinUpcomingClass: React.PropTypes.func,
  isExpiredLesson: React.PropTypes.bool,
  terminateLesson: React.PropTypes.func
};

export default UpcommingCourseNotificationPopup;
