import Network from "utils/network";
import { 
  FETCH_STUDENT_ENROLL_COURSES,
  FETCH_STUDENT_FOLLOW_COURSES 
} from "../../actions/AsyncActionCreator";

export const fetchListStudentEnrollCourses = () => {
  return dispatch => {
    dispatch({
      type: FETCH_STUDENT_ENROLL_COURSES,
      payload: Network().get('users/enrolled_courses')
    })
  }
}

export const fetchListStudentFollowCourses = () => {
  return dispatch => {
    dispatch({
      type: FETCH_STUDENT_FOLLOW_COURSES,
      payload: Network().get('users/followed_courses')
    })
  }
}