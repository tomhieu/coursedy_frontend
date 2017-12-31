import * as types from '../constants/Teachers';


const Teachers = (state = {
  total: 0,
  data: [],
  nextPage: null,
  previousPage: null,
  loading: true,
  error: null
}, action) => {
  switch (action.type) {
    case types.FETCH_TEACHERS:
      return {...state, loading: true, error: null}
    case types.FETCH_TEACHERS_SUCCESS:
      let data = JSON.parse(JSON.stringify(state.data));
      data.push(action.payload);
      return {...state, ...action.payload, data: data, loading: false, error: null}
    case types.FETCH_TEACHERS_FAIL:
      return {...state, loading: false, error: action.error, data:[], total: 0}
    default:
      return state
  }
};

export default Teachers;
