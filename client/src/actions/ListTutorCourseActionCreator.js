import * as asyncActs from '../actions/AsyncActionCreator';
import Network from "utils/network";

export const fetchUpcomingTutorCourse = () => {
  return {
    type: asyncActs.FETCH_TUTOR_UPCOMING_COURSES,
    payload: Network().get('courses/upcomming_teaching_classes')
  }
}

export const fetchUpcomingStudentCourse = () => {
  return {
    type: asyncActs.FETCH_STUDENT_UPCOMING_COURSES,
    payload: Network().get('courses/upcomming_classes')
  }
}

export const joinToClassRoom = (classRoomId) => {
  Network().get(`rooms/${classRoomId}/join`, {}, true).then((res) => {
    window.open(res.url, '_blank');
  })
}