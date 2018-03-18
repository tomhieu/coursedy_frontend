import * as ActionTypes from '../constants/Teachers';
import Network from '../utils/network';
import * as asyncActs from 'actions/AsyncActionCreator'

export const searchTeachers = (query) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_TEACHERS,
      payload: Network().get('tutors/search', query)
    });
  };
};

export const loadSuggestionsTeacher = (query) => {
  return dispatch => {
    dispatch({
      type: asyncActs.LOAD_SUGGESTION_TEACHERS,
      payload: Network().get('tutors/search', query)
    })
  }
}

export const updateFilterTeacher = (filters) => {
  return dispatch => {
    dispatch({
      type: asyncActs.UPDATE_FILTER_CRITERIA_TEACHERS,
      data: filters
    })
  }
}
