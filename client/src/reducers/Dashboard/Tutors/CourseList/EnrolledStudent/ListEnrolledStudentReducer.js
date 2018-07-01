import * as actionTypes from "actions/AsyncActionCreator";

const EnrolledStudentList = (state = {
  enrolledStudents: [{
    id: 0,
    name: 'Pham Duy Bao Trung',
    email: 'pdbaotrung@gmail.com',
    gender: 'Nam',
    date_of_enrollment: '01/01/2018'
  }]
}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ENROLLED_STUDENT + actionTypes.FULFILLED:
      return {...state, enrolledStudents: action.payload}
    default:
      return state
  }
}

export default EnrolledStudentList
