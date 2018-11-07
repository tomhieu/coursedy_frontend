import * as React from 'react';
import {Component} from 'react';
import {SecurityUtils} from 'utils/SecurityUtils';
import {globalHistory} from 'utils/globalHistory';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import "babel-polyfill"
import {renderRadioFields} from '../../Core/CustomComponents';
import Field from 'redux-form/es/Field';
import FormField from '../../Core/FormField';

class UpcommingCourseNotificationPopup extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const { currentUser, teachingCourse, selectedLessonId } = this.props;
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
  selectedLessonId: React.PropTypes.number,
  lesson: React.PropTypes.object,
  teacherName: React.PropTypes.string,
  acceptJoinToClassRoom: React.PropTypes.func,
  closePopupJoinUpcomingClass: React.PropTypes.func
};

export default UpcommingCourseNotificationPopup;
