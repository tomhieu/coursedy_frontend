import * as asyncActs from 'actions/AsyncActionCreator';


const TeacherDetail = (state = {
  isFetching: false,
  error: null
}, action) => {
  switch (action.type) {
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.PENDING:
      return {...state, isFetching: true, error: null}
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.FULFILLED:
      return {...state, ...action.payload, error: null}
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.REJECTED:
      return {...state, error: action.error}
    default:
      return state
  }
};

export default TeacherDetail;
