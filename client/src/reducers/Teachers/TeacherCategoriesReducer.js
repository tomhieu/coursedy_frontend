import * as types from '../../constants/Teachers';


const TeacherCategories = (state = {
  data: [],
  loading: true,
  error: null
}, action) => {
  switch (action.type) {
    case types.FETCH_TEACHER_CATEGORY:
      return {...state, loading: true, error: null}
    case types.FETCH_TEACHER_CATEGORY_SUCCESS:
      return {...state, data: action.payload, loading: false, error: null}
    case types.FETCH_TEACHER_CATEGORY_FAIL:
      return {...state, loading: false, error: action.error}
    default:
      return state
  }
};

export default TeacherCategories;
