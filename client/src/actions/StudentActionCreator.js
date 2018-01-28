import * as courseActionTypes from 'constants/Students';
import * as types from 'constants/Students';
import Network from 'utils/network';


// fetch comments for home page, ...
export const fetchStudentsComment = (query) => {
  return dispatch => {
    //FIXME: Comment for dummy data
    // Network().get('comments', query).then((response) => {
    //   dispatch({
    //     type: courseActionTypes.FETCH_COURSES_SUCCESS,
    //     payload: response
    //   })
    // })

    //FIXME: Remove me
    dispatch({
      type: courseActionTypes.FETCH_STUDENT_TOP_COMMENTS_SUCCESS,
      payload: types.dummyComments
    })
  }
}
