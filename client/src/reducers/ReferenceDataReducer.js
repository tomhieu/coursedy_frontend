import * as asyncActs from '../actions/AsyncActionCreator';


const referenceData = (state = { courseCategories: [], locations: [] }, action) => {
  switch (action.type) {
    case asyncActs.FETCH_CATEGORIES + asyncActs.FULFILLED:
      return { ...state, courseCategories: action.payload };
    case asyncActs.FETCH_LOCATIONS + asyncActs.FULFILLED:
      return { ...state, locations: action.payload };
    default:
      return state;
  }
};

export default referenceData;
