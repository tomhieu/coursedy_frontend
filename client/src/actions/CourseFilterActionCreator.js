import * as types from '../constants/CourseFilter';
import * as courseActionTypes from '../constants/Courses';
import Network from '../utils/network'
import {TT} from '../utils/locale'

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

export const reloadCourseLevels = (categoryIdList) => {
  return dispatch => {
    dispatch({
      type: types.RELOAD_COURSE_LEVELS,
      payload: categoryIdList
    })
  }
}

export const selectCourseLevel = (level, selected) => {
  return dispatch => {
    if (selected){
      dispatch({
        type: types.SELECT_COURSE_LEVEL,
        payload: parseInt(level)
      })
    } else {
      dispatch({
        type: types.DESELECT_COURSE_LEVEL,
        payload: parseInt(level)
      })
    }
  }
}

export const selectWeekday = (day, selected) => {
  return dispatch => {
    if (selected){
      dispatch({
        type: types.SELECT_WEEK_DAY,
        payload: parseInt(day)
      })
    } else {
      dispatch({
        type: types.DESELECT_WEEK_DAY,
        payload: parseInt(day)
      })
    }
  }
}

export const selectFee = (fee, selected) => {
  return dispatch => {
    if (selected){
      dispatch({
        type: types.SELECT_FEE,
        payload: parseInt(fee)
      })
    } else {
      dispatch({
        type: types.DESELECT_FEE,
        payload: parseInt(fee)
      })
    }
  }
}

export const changeKeyWord = (value) => {
  return dispatch => {
    dispatch({
      type: types.CHANGE_KEY_WORD,
      payload: value
    })
  }
}

export const selectCourseLocations = (locationList) => {
  return dispatch => {
    dispatch({
      type: types.SELECT_COURSE_LOCATIONS,
      payload: locationList
    })
  }
}

export const selectStartTime = (time) => {
  return dispatch => {
    dispatch({
      type: types.SELECT_START_TIME,
      payload: parseFloat(time)
    })
  }
}

export const selectEndTime = (time) => {
  return dispatch => {
    dispatch({
      type: types.SELECT_END_TIME,
      payload: parseFloat(time)
    })
  }
}

export const setStartTimeError = (error) => {
  return dispatch => {
    dispatch({
      type: types.SET_START_TIME_ERROR,
      payload: error
    })
  }
}

export const setEndTimeError = (error) => {
  return dispatch => {
    dispatch({
      type: types.SET_END_TIME_ERROR,
      payload: error
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
        title: "Thành Phố Hồ Chí Minh",
        id: 1,
        type: "location"
      },
      {
        title: "Hà Nội",
        id: 2,
        type: "location"
      },
      {
        title: "Đà Nẵng",
        id: 3,
        type: "location"
      }
    ]
  },
  {
    name: "Loại Khoá ",
    suggestions: [
      {
        title: "Ngoại Ngữ",
        id: 1,
        type: "category"
      },
      {
        title: "Luyện Thi Đại Học",
        id: 2,
        type: "category"
      },
      {
        title: "Chương Trình THPT",
        id: 3,
        type: "category"
      }
    ]
  },
  {
    name: "Khoá Học Đang Mo",
    suggestions: [
      {
        title: "Luyện Thi TOIEC 500-650",
        id: 1,
        type: "course"
      },
      {
        title: "Luyện Thi IELTS 5.5 - 6.5",
        id: 2,
        type: "course"
      },
      {
        title: "Luyện Thi TOFLE 160 - 200",
        id: 3,
        type: "course"
      }
    ]
  }
]

const filterSuggestion = (term, group) => {
  const filterSuggest = group.suggestions.filter((s) => s.title.includes(term));
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
  return dispatch({
    type: types.ADD_FILTER_CRITERIA,
    data: filter
  })
}
