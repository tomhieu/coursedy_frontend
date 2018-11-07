import * as React from 'react';
import {Component} from 'react';
import cssModules from 'react-css-modules';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import styles from './LearningNotificationPopupContainer.module.scss'
import FormDialogContainer from '../../Dialog/FormDialogContainer';
import UpcommingCourseNotificationPopup from '../../../components/Layout/UpcommingCoursePopup/UpcommingCourseNotificationPopup';
import {LessonStatus} from '../../../constants/LessonStatus';

class LearningNotificationPopupContainer extends Component {
  render() {
    const {currentUser, course, handleSubmit, acceptJoinToClassRoom, closePopupJoinUpcomingClass, selectedLessonId} = this.props;
    if (course == null) {
      return null;
    }
    const classRoomId = course && course.bigbluebutton_room ? course.bigbluebutton_room.slug : '';
    const upcommingLesson = course.lessons.find(l => l.status !== LessonStatus.FINISH && l.status !== LessonStatus.STARTED);
    return (
      <FormDialogContainer show={classRoomId !== null}
                           formName="joinToClassForm"
                           title={this.context.t('join_active_course_popup_title')}
                           acceptCallback={acceptJoinToClassRoom.bind(this)}
                           acceptLabel={this.context.t('join_to_class_button_name')}
                           cancelCallback={closePopupJoinUpcomingClass.bind(this)}>
        <form onSubmit={handleSubmit(this.props.onSubmit)} className="inline-form" multiple>
          <UpcommingCourseNotificationPopup
            teachingCourse={course}
            selectedLessonId={selectedLessonId}
            lesson={upcommingLesson}
            teacherName={course.user.name}
            currentUser={currentUser}
            classRoomId={classRoomId}
            acceptJoinToClassRoom={acceptJoinToClassRoom.bind(this)}
            closePopupJoinUpcomingClass={closePopupJoinUpcomingClass.bind(this)}
          />
        </form>
      </FormDialogContainer>
    );
  }
}

LearningNotificationPopupContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

LearningNotificationPopupContainer.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  course: React.PropTypes.object.isRequired,
  acceptJoinToClassRoom: React.PropTypes.func,
  closePopupJoinUpcomingClass: React.PropTypes.func
};

const mapStateToProps = (state, props) => {
  const { course } = props;
  const { joinToClassForm } = state.form;
  const initialValues = {selectedLesson: 0};
  if (!course) {
    return { initialValues };
  }
  const upcommingLesson = course.lessons.find(l => l.status !== LessonStatus.FINISH && l.status !== LessonStatus.STARTED);
  initialValues.selectedLesson = upcommingLesson.id;
  const selectedLessonId = joinToClassForm && joinToClassForm.values.selectedLesson ?  joinToClassForm.values.selectedLesson : upcommingLesson.id;
  return { initialValues, selectedLessonId };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'joinToClassForm',
  fields: ['selectedLesson'],
})(cssModules(LearningNotificationPopupContainer, styles)));
