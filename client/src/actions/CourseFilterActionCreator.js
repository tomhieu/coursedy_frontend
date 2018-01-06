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
    //FIXME: Comment for dummy data
    // Network().get('courses', query).then((response) => {
    //   dispatch({
    //     type: courseActionTypes.FETCH_COURSES_SUCCESS,
    //     payload: response
    //   })
    // })

    //FIXME: Remove me
    dispatch({
      type: courseActionTypes.FETCH_COURSES_SUCCESS,
      payload: types.dummyCourses
    })
  }
}

export const changeDisplayMode = (mode) => {
  return dispatch => {
    dispatch({
      type: types.CHANGE_DISPLAY_MODE,
      payload: mode
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

export const changeSortBy = (sortBy) => {
  return dispatch => {
    dispatch({
      type: types.CHANGE_SORT_BY,
      payload: sortBy
    })
  }
}


export const selectCourse = (courseId) => {
  return dispatch => {
    dispatch({
      type: types.SELECT_COURSE,
      payload: courseId
    })
  }
}
export const selectAllCourses = () => {
  return dispatch => {
    dispatch({
      type: types.SELECT_ALL_COURSES,
    })
  }
}
export const removeCourse = (courseId) => {
  return dispatch => {
    dispatch({
      type: types.REMOVE_COURSE,
      payload: courseId
    })
  }
}
export const removeAllCourses = () => {
  return dispatch => {
    dispatch({
      type: types.REMOVE_ALL_COURSES,
    })
  }
}