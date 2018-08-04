import * as actionTypes from "actions/AsyncActionCreator";

const EnrolledStudentList = (state = {
  enrolledStudents: [{
    id: 0,
    name: 'Pham Duy Bao Trung',
    email: 'pdbaotrung@gmail.com',
    gender: 'Nam',
    date_of_enrollment: '01/01/2018'
  }],
  activeCourseId: undefined,
  isFetching: false
}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ENROLLED_STUDENT + actionTypes.PENDING:
      return {...state, isFetching: true}
    case actionTypes.FETCH_ENROLLED_STUDENT + actionTypes.FULFILLED:
      return {...state, enrolledStudents: action.payload, isFetching: false}
    case actionTypes.SHOW_ENROLLED_STUDENT_LIST:
      const newActiveCourseId = action.data;
      if (newActiveCourseId === state.activeCourseId) {
        return {...state, activeCourseId: undefined};
      } else {
        return {...state, activeCourseId: newActiveCourseId}
      }
    default:
      return state
  }
}

export default EnrolledStudentList
