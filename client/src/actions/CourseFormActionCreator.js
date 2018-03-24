import * as asyncActs from '../actions/AsyncActionCreator';
import Network from '../utils/network'
import {TT} from '../utils/locale'
import {fetchListTutorCourse} from "actions/ListTutorCourseActionCreator";
import {
  ADD_NEW_SECTION, CLOSE_POPUP_ADD_SECTION, CLOSED_ACTIVATED_FIELD, CREATE_NEW_COURSE, CREATE_UPDATE_SECTION,
  DELETE_SECTION, FETCH_DETAIL_COURSE,
  FETCH_LIST_SECTION, PUBLISH_COURSE,
  TRIGGER_ACTIVATE_FIELD,
  VALIDATE_BEFORE_PUBLISH_COURSE
} from "actions/AsyncActionCreator";


/**
 * List days of week
 */
export const DAYS_IN_WEEK = [
  {id: 1, text: TT.t('monday'), name: 'monday'},
  {id: 2, text: TT.t('tuesday'), name: 'tuesday'},
  {id: 3, text: TT.t('wednesday'), name: 'wednesday'},
  {id: 4, text: TT.t('thursday'), name: 'thursday'},
  {id: 5, text: TT.t('friday'), name: 'friday'},
  {id: 6, text: TT.t('saturday'), name: 'saturday'},
  {id: 0, text: TT.t('sunday'), name: 'sunday'}
]

/**
 *
 * @param title
 * @param description
 * @param category_id
 * @param course_level_id
 * @param start_date
 * @param end_date
 * @param number_of_students
 * @param period
 * @param period_type
 * @param tuition_fee
 * @param currency
 * @param cover_image
 * @returns {function(*)}
 */

export const createCourse = (title, description, start_date, period, number_of_students, tuition_fee, currency,
                             is_free, week_day_schedules_attributes, is_same_period, category_id, cover_image) => {
  return dispatch => {
    let body = {
      title, description, start_date, period, number_of_students, tuition_fee, currency, is_free, week_day_schedules_attributes,
      is_same_period, category_id, cover_image
    };
    dispatch({
      type: asyncActs.CREATE_NEW_COURSE,
      payload: Network().post('courses', body)
    });
  }
};

export const updateCourse = (id, title, description, start_date, period,
                             number_of_students, tuition_fee, currency, is_free, week_day_schedules_attributes, is_same_period,
                             category_id, cover_image) => {
  return dispatch => {
    let body = {
      id, title, description, start_date, period,
      number_of_students, tuition_fee, currency, is_free, week_day_schedules_attributes, is_same_period,
      cover_image, category_id
    };
    dispatch({
      type: asyncActs.UPDATE_COURSE,
      payload: Network().update('courses/' + id, body)
    });
  }
}

export const deleteCourse = (course_id) => {
  return dispatch => {
    Network().delete('courses/' + course_id).then(() => {
      dispatch(fetchListTutorCourse());
    })
  }
}

export const loadCourseDetail = (courseId) => {
  return dispatch => {
    dispatch({
      type: FETCH_DETAIL_COURSE,
      payload: Network().get(/courses/ + courseId)
    })
    dispatch(loadListSection(courseId));
  };
};

export const createNewCourse = () => {
  return {
    type: CREATE_NEW_COURSE
  }
}

export const activatedEditField = (fieldId) => {
  return {
    type: TRIGGER_ACTIVATE_FIELD,
    data: fieldId
  }
}

export const closedEditField = (fieldId) => {
  return {
    type: CLOSED_ACTIVATED_FIELD,
    data: fieldId
  }
}

export const loadListSection = (courseId) => {
  return {
    type: FETCH_LIST_SECTION,
    payload: Network().get('/course_sections?course_id=' + courseId)
  }
}

export const publishCourse = (courseId) => {
  return {
    type: PUBLISH_COURSE,
    payload: Network().post('courses/publish', courseId)
  }
}

export const validateBeforePublishCCourse = () => {
  return {
    type: VALIDATE_BEFORE_PUBLISH_COURSE
  }
}

/**
 * Defined all action methods to handle Section
 */
export const addNewSection = () => {
  return {
    type: ADD_NEW_SECTION
  }
}

export const closePopupSection = () => {
  return {
    type: CLOSE_POPUP_ADD_SECTION
  }
}

export const saveOrUpdateSection = (id, title) => {
  return {
    type: CREATE_UPDATE_SECTION,
    payload: Network().post('course_sections', {course_id: id, title})
  }
}

export const deleteSection = (id) => {
  return {
    type: DELETE_SECTION,
    payload: Network().delete('course_sections', id)
  }
}