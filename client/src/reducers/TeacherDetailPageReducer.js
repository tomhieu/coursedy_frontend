import * as asyncActs from 'actions/AsyncActionCreator';


const TeacherDetail = (state = {
  isFetching: false,
  error: null,
  educations: [],
  workExperiences: [],
}, action) => {
  switch (action.type) {
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.PENDING:
      return {...state, isFetching: true, error: null}
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.FULFILLED:
      return {...state, ...action.payload, error: null}
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.REJECTED:
      return {...state, error: action.error}
    case asyncActs.FETCH_TEACHER_EDUCATIONS + asyncActs.FULFILLED:
      return {...state, educations: action.payload}
    case asyncActs.FETCH_TEACHER_WORK_EXPERIENCES + asyncActs.FULFILLED:
      return {...state, workExperiences: action.payload}
    default:
      return state
  }
};

export default TeacherDetail;
