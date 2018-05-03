import * as asyncActs from 'actions/AsyncActionCreator';


const TeacherDetail = (state = {
  isFetching: false,
  courses: {data: [], headers: {}},
  error: null,
  educations: [],
  workExperiences: [],
  reviews: {data: [],  headers: {}}
}, action) => {
  switch (action.type) {
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.PENDING:
      return {...state, isFetching: true, error: null}
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.FULFILLED:
      return {...state, ...action.payload, error: null, isFetching: false}
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.REJECTED:
      return {...state, error: action.error, isFetching: false}

    case asyncActs.FETCH_TEACHER_EDUCATIONS + asyncActs.FULFILLED:
      return {...state, educations: action.payload}

    case asyncActs.FETCH_TEACHER_WORK_EXPERIENCES + asyncActs.FULFILLED:
      return {...state, workExperiences: action.payload}

      case asyncActs.FETCH_TEACHER_REVIEWS + asyncActs.FULFILLED:
      return {...state, reviews: {data: action.payload, headers: state.reviews.headers}}
    case asyncActs.FETCH_TEACHER_REVIEWS + asyncActs.HEADERS:
      return {...state, reviews: {data: state.reviews.data, headers: action.payload}}

      case asyncActs.FETCH_TEACHER_COURSES + asyncActs.FULFILLED:
      return {...state, courses: {data: action.payload, headers: state.courses.headers}}
    case asyncActs.FETCH_TEACHER_COURSES + asyncActs.HEADERS:
      return {...state, courses: {data: state.courses.data, headers: action.payload}}
    default:
      return state
  }
};

export default TeacherDetail;
