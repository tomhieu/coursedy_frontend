import { StudentAccountTypes } from '../../constants/index'

const StudentAccountReducer = (state = {
  student: {}
}, action) => {
  switch (action.type) {
    case StudentAccountTypes.SET_ACCOUNT_STUDENT:
      return {...state, tutor: action.payload}
    default:
      return state
  }
}

export default StudentAccountReducer
