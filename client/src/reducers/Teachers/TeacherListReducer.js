import * as types from '../../constants/Teachers';


const TeacherList = (state = {
  data: [],
  loading: true,
  loadingMore: true,
  endedLoadingMore: false,
  error: null,
  errorNextLoading: null
}, action) => {
  switch (action.type) {
    case types.FETCH_TEACHERS:
      return {...state, loading: true, error: null}
    case types.FETCH_TEACHERS_SUCCESS:
      let endedLoadingMore = false
      if (action.payload.next === null) {
        endedLoadingMore = true
      }
      return {...state, data: action.payload, loading: false, error: null, endedLoadingMore}
    case types.FETCH_TEACHERS_FAIL:
      return {...state, loading: false, error: action.error}
    case types.FETCH_MORE_TEACHERS:
      return {...state, loadingMore: true, endedLoadingMore: false, errorNextLoading: null}
    case types.FETCH_MORE_TEACHERS_SUCCESS:
      let data = JSON.parse(JSON.stringify(state.data));
      data.push(action.payload);
      return {...state, data, loadingMore: false, endedLoadingMore: false, errorNextLoading: null}
    case types.FETCH_MORE_TEACHERS_FAIL:
      return {...state, loadingMore: false, endedLoadingMore: false, errorNextLoading: action.error}
    case types.FETCH_MORE_TEACHERS_ENDED:
      return {...state, loadingMore: false, endedLoadingMore: true, errorNextLoading: null}
    default:
      return state
  }
};

export default TeacherList;
