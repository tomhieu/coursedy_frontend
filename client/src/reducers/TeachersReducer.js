import * as asyncActs from 'actions/AsyncActionCreator';


const Teachers = (state = {
  total: 0,
  data: [],
  nextPage: null,
  previousPage: null,
  isFetching: true,
  error: null,
  suggestions: [],
  filters: {selectedCategories: [], selectedSpecializes: [], term: ''},
  showSuggestion: false,
  loadingSuggestion: false,
  headers: null
}, action) => {
  switch (action.type) {
    case asyncActs.FETCH_TEACHERS + asyncActs.PENDING:
      return {...state, isFetching: true, error: null}
    case asyncActs.FETCH_TEACHERS + asyncActs.FULFILLED:
      return {...state, data: action.payload, isFetching: false, error: null}
    case asyncActs.FETCH_TEACHERS + asyncActs.HEADERS:
      return {...state, headers: action.payload, isFetching: true, error: null}
    case asyncActs.FETCH_TEACHERS + asyncActs.REJECTED:
      return {...state, isFetching: false, error: action.error, data:[], total: 0}
    /**
     * Handle action to load suggestion to filter Course
     */
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.FULFILLED:
      return {...state, suggestions: action.payload, showSuggestion: true, loadingSuggestion: false}
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.PENDING:
      return {...state, suggestions: [], showSuggestion: true, loadingSuggestion: true}
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.REJECTED:
      return {...state, suggestions: [], error: action.error, showSuggestion: false, loadingSuggestion: false}
    case asyncActs.CLEAR_SUGGESTION:
      return {...state, filters: {...state.filters, term: ''}, suggestions: [], showSuggestion: false, loadingSuggestion: false}
    case asyncActs.UPDATE_FILTER_CRITERIA_TEACHERS:
      return Object.assign({}, state, {filters: action.data})
    default:
      return state
  }
};

export default Teachers;
