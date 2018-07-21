import * as asyncActions from 'actions/AsyncActionCreator';
import Network from 'utils/network';
import {LessonStatus} from "../constants/LessonStatus";


// fetch comments for home page, ...
export const fetchCourseToEvaluate = (courseId, bbbRoom) => dispatch => {
  Network().get(/courses/ + courseId).then((course) => {
    // invalid course room, reject immediately
    if (!course.bigbluebutton_room || !course.bigbluebutton_room.slug || course.bigbluebutton_room.slug !== bbbRoom) {
      dispatch(rejectCourseToEvaluate());
    } else {
      Network().get('course_sections', {course_id: courseId}).then((sections) => {
        // no section, reject course immediately
        if (Array.isArray(sections) && sections.length === 0) {
          dispatch(rejectCourseToEvaluate());
        }
        // find the active section
        const activeSection = sections.find((section) => section.lessons.find(
          (lesson) => (!lesson.status || lesson.status === LessonStatus.NOT_STARTED)) !== undefined);
        if (!activeSection) {
          dispatch(rejectCourseToEvaluate());
        }

        const activeLesson = activeSection.lessons.find(lesson => (!lesson.status || lesson.status === LessonStatus.NOT_STARTED));
        dispatch({
          type: asyncActions.UPDATE_COURSE_NEED_TO_EVALUATE,
          payload: {
            activeCourse: course,
            activeLesson: activeLesson
          }
        })
      })
    }
  })
}

export const rejectCourseToEvaluate = () => {
  return {type: asyncActions.REJECT_COURSE_NEED_TO_EVALUATE};
}
