import * as asyncActs from 'actions/AsyncActionCreator';


export const initialState = {
  total: 0,
  data: [],
  isFetching: true,
  error: null,
  suggestions: [],
  filters: { selectedCategories: [], selectedSpecializes: [], term: '' },
  showSuggestion: false,
  loadingSuggestion: false,
  headers: null
};

export const Teachers = (state = initialState, action) => {
  switch (action.type) {
    case asyncActs.FETCH_TEACHERS + asyncActs.PENDING:
      return { ...state, isFetching: true, error: null };
    case asyncActs.FETCH_TEACHERS + asyncActs.FULFILLED:
      return {
        ...state,
        data: action.payload,
        headers: action.headers,
        isFetching: false,
        error: null
      };

    case asyncActs.FETCH_TEACHERS + asyncActs.REJECTED:
      return {
        ...state, isFetching: false, error: action.error, data: [], total: 0
      };
    /**
     * Handle action to load suggestion to filter Course
     */
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.FULFILLED:
      return {
        ...state,
        suggestions: action.payload,
        showSuggestion: true,
        loadingSuggestion: false
      };
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.PENDING:
      return {
        ...state, suggestions: [], showSuggestion: true, loadingSuggestion: true
      };
    case asyncActs.LOAD_SUGGESTION_TEACHERS + asyncActs.REJECTED:
      return {
        ...state,
        suggestions: [],
        error: action.error,
        showSuggestion: false,
        loadingSuggestion: false
      };
    case asyncActs.CLEAR_SUGGESTION_TEACHERS:
      return {
        ...state,
        filters: { ...state.filters },
        suggestions: [],
        showSuggestion: false,
        loadingSuggestion: false
      };
    case asyncActs.UPDATE_FILTER_CRITERIA_TEACHERS:
      return Object.assign({}, state, { filters: { ...state.filters, ...action.data } });
    default:
      return state;
  }
};

export default Teachers;
