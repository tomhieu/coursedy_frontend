import * as types from '../constants/Teachers';
import * as asyncActs from 'actions/AsyncActionCreator';


const Teachers = (state = {
  total: 0,
  data: [],
  nextPage: null,
  previousPage: null,
  loading: true,
  error: null
}, action) => {
  switch (action.type) {
    case types.FETCH_TEACHERS + asyncActs.PENDING:
      return {...state, loading: true, error: null}
    case types.FETCH_TEACHERS + asyncActs.FULFILLED:
      let data = JSON.parse(JSON.stringify(state.data));
      data.push(action.payload);
      return {...state, ...action.payload, data: data, loading: false, error: null}
    case types.FETCH_TEACHERS + asyncActs.REJECTED:
      return {...state, loading: false, error: action.error, data:[], total: 0}
    default:
      return state
  }
};

export default Teachers;
