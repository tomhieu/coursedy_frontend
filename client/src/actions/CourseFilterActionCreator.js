import * as types from '../constants/CourseFilter';
import * as courseActionTypes from '../constants/Courses';
import Network from '../utils/network'

export const fetchCategories = () => {
  return dispatch => {
    Network().get('categories').then((response) => {
      dispatch({
        type: types.FETCH_CATEGORIES_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
    //  TODO handle error
    })
  }
}

export const fetchLocations = () => {
  return dispatch => {
    Network().get('locations').then((response) => {
      dispatch({
        type: types.FETCH_LOCATIONS_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
    //  TODO handle error
    })
  }
}

export const fetchWeekdays = () => {
  return dispatch => {
    Network().get('weekdays').then((response) => {
      dispatch({
        type: types.FETCH_WEEKDAYS_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      //  TODO handle error
    })
  }
}

export const searchCourse = (query) => {
  return dispatch => {
    Network().get('courses', query).then((response) => {
      dispatch({
        type: courseActionTypes.FETCH_COURSES_SUCCESS,
        payload: response
      })
    })
  }
}

export const changeViewType = (type) => {
  return dispatch => {
    dispatch({
      type: types.CHANGE_VIEW_TYPE,
      payload: type
    })
  }
}

export const changeCurrentPage = (page) => {
  return dispatch => {
    dispatch({
      type: types.CHANGE_CURRENT_PAGE,
      payload: page
    })
  }
}

const dummySuggestions = [
  {
    name: "Địa điểm",
    suggestions: [
      {
        text: "Thành Phố Hồ Chí Minh",
        id: 1,
        group: "location"
      },
      {
        text: "Hà Nội",
        id: 2,
        group: "location"
      },
      {
        text: "Đà Nẵng",
        id: 3,
        group: "location"
      }
    ]
  },
  {
    name: "Loại Khoá ",
    suggestions: [
      {
        text: "Ngoại Ngữ",
        id: 1,
        group: "category"
      },
      {
        text: "Luyện Thi Đại Học",
        id: 2,
        group: "category"
      },
      {
        text: "Chương Trình THPT",
        id: 3,
        group: "category"
      }
    ]
  },
  {
    name: "Khoá Học Đang Mo",
    suggestions: [
      {
        text: "Luyện Thi TOIEC 500-650",
        id: 1,
        group: "course"
      },
      {
        text: "Luyện Thi IELTS 5.5 - 6.5",
        id: 2,
        group: "course"
      },
      {
        text: "Luyện Thi TOFLE 160 - 200",
        id: 3,
        group: "course"
      }
    ]
  }
]

const filterSuggestion = (term, group) => {
  const filterSuggest = group.suggestions.filter((s) => s.text.includes(term));
  return filterSuggest.length > 0 ? {...group, suggestions: filterSuggest} : null;
}

export const loadSuggestions = (term) => {
  const result = [];
  dummySuggestions.map((group) => {
    const g = filterSuggestion(term, group);
    if (g != null) {
      result.push(g);
    }
  })
  return dispatch => {
    dispatch({
      type: types.LOAD_SUGGESTION_COMPLETE,
      payload: result
    })
  }
}

export const addFilterSuggestion = (filter) => {
  return dispatch => {
    dispatch({
      type: types.ADD_FILTER_CRITERIA,
      data: filter
    })
  }
}

export const removeFilterSuggestion = (filterId) => {
  return dispatch => {
    dispatch({
      type: types.REMOVE_FILTER_CRITERIA,
      data: filterId
    })
  }
}
