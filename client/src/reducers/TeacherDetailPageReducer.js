import * as asyncActs from 'actions/AsyncActionCreator';

const TeacherDetail = (state = {
  isFetching: false,
  courses: { data: [], headers: {} },
  error: null,
  educations: [],
  workExperiences: [],
  reviews: { data: [], headers: {} },
  submitCommentSuccess: false,
  submitCommentFail: false,
}, action) => {
  switch (action.type) {
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.PENDING:
      return { ...state, isFetching: true, error: null };
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.FULFILLED:
      return {
        ...state,
        ...action.payload,
        error: null,
        isFetching: false
      };
    case asyncActs.FETCH_TEACHER_DETAIL + asyncActs.REJECTED:
      return { ...state, error: action.payload, isFetching: false };

    case asyncActs.FETCH_TEACHER_EDUCATIONS + asyncActs.FULFILLED:
      return { ...state, educations: action.payload };

    case asyncActs.FETCH_TEACHER_WORK_EXPERIENCES + asyncActs.FULFILLED:
      return { ...state, workExperiences: action.payload };

    case asyncActs.FETCH_TEACHER_REVIEWS + asyncActs.FULFILLED:
      return { ...state, reviews: { ...state.reviews, data: action.payload, headers: action.headers } };

    case asyncActs.FETCH_TEACHER_COURSES + asyncActs.FULFILLED:
      return { ...state, courses: { ...state.courses, data: action.payload, headers: action.headers } };
    // comments for the teacher
    case asyncActs.TEACHER_DETAIL_SUBMIT_COMMENT + asyncActs.PENDING:
      return { ...state, submitCommentSuccess: false, submitCommentFail: false };
    case asyncActs.TEACHER_DETAIL_SUBMIT_COMMENT + asyncActs.FULFILLED:
      return {
        ...state,
        reviews: { ...state.reviews, data: state.reviews.data.concat(action.payload) },
        submitCommentSuccess: true,
        submitCommentFail: false
      };
    case asyncActs.TEACHER_DETAIL_SUBMIT_COMMENT + asyncActs.REJECTED:
      return { ...state, submitCommentSuccess: false, submitCommentFail: true };
    default:
      return state;
  }
};

export default TeacherDetail;
