import * as types from '../constants/Teachers';
import * as asyncActs from 'actions/AsyncActionCreator';


const Teachers = (state = {
  total: 0,
  data: [],
  nextPage: null,
  previousPage: null,
  loading: true,
  error: null,
  suggestions: [],
  filters: {selectedCategories: [], selectedSpecializes: [], term: ''},
  showSuggestion: false,
  loadingSuggestion: false
}, action) => {
  switch (action.type) {
    case types.FETCH_TEACHERS + asyncActs.PENDING:
      return {...state, loading: true, error: null}
    case types.FETCH_TEACHERS + asyncActs.FULFILLED:
      return {...state, data: action.payload, loading: false, error: null}
    case types.FETCH_TEACHERS + asyncActs.REJECTED:
      return {...state, loading: false, error: action.error, data:[], total: 0}
    /**
     * handle action to load suggestion to filter Course
     */
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.FULFILLED:
      return {...state, suggestions: action.payload, showSuggestion: action.payload.length > 0, loadingSuggestion: false}
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.PENDING:
      return {...state, suggestions: [], showSuggestion: true, loadingSuggestion: true}
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.REJECTED:
      return {...state, suggestions: [], error: action.error, showSuggestion: false, loadingSuggestion: false}
    case asyncActs.UPDATE_FILTER_CRITERIA_TEACHERS:
      return Object.assign({}, state, {filters: action.data})
    default:
      return state
  }
};

export default Teachers;
