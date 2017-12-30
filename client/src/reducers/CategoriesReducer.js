import * as types from 'constants/CourseFilter';


const Categories = (state = {data:[]}, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESSFULLY:
      return {...state, data: action.payload}
    default:
      return state;
  }
};

export default Categories;
