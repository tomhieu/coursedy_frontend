import { fetchListTutorCourse } from 'actions/ListTutorCourseActionCreator';
import {
  ADD_NEW_SECTION, CLOSE_POPUP_ADD_SECTION, CLOSED_ACTIVATED_FIELD, CREATE_NEW_COURSE, CREATE_UPDATE_SECTION,
  DELETE_SECTION, FETCH_DETAIL_COURSE,
  FETCH_LIST_SECTION, PUBLISH_COURSE,
  TRIGGER_ACTIVATE_FIELD,
  VALIDATE_BEFORE_PUBLISH_COURSE
} from 'actions/AsyncActionCreator';
import * as asyncActs from './AsyncActionCreator';
import Network from '../utils/network';
import { TT } from '../utils/locale';


/**
 * List days of week
 */
export const DAYS_IN_WEEK = [
  { id: 1, text: TT.t('monday'), name: 'monday' },
  { id: 2, text: TT.t('tuesday'), name: 'tuesday' },
  { id: 3, text: TT.t('wednesday'), name: 'wednesday' },
  { id: 4, text: TT.t('thursday'), name: 'thursday' },
  { id: 5, text: TT.t('friday'), name: 'friday' },
  { id: 6, text: TT.t('saturday'), name: 'saturday' },
  { id: 0, text: TT.t('sunday'), name: 'sunday' }
];

export const HOURS_IN_DAY = [
  { id: '06:00:00', text: '6:00' },
  { id: '06:30:00', text: '6:30' },
  { id: '07:00:00', text: '7:00' },
  { id: '07:30:00', text: '7:30' },
  { id: '08:00:00', text: '8:00' },
  { id: '08:30:00', text: '8:30' },
  { id: '09:00:00', text: '9:00' },
  { id: '09:30:00', text: '9:30' },
  { id: '10:00:00', text: '10:00' },
  { id: '10:30:00', text: '10:30' },
  { id: '11:00:00', text: '11:00' },
  { id: '11:30:00', text: '11:30' },
  { id: '12:00:00', text: '12:00' },
  { id: '12:30:00', text: '12:30' },
  { id: '13:00:00', text: '13:00' },
  { id: '13:30:00', text: '13:30' },
  { id: '14:00:00', text: '14:00' },
  { id: '14:30:00', text: '14:30' },
  { id: '15:00:00', text: '15:00' },
  { id: '15:30:00', text: '15:30' },
  { id: '16:00:00', text: '16:00' },
  { id: '16:30:00', text: '16:30' },
  { id: '17:00:00', text: '17:00' },
  { id: '17:30:00', text: '17:30' },
  { id: '18:00:00', text: '18:00' },
  { id: '18:30:00', text: '18:30' },
  { id: '19:00:00', text: '19:00' },
  { id: '19:30:00', text: '19:30' },
  { id: '20:00:00', text: '20:00' },
  { id: '20:30:00', text: '20:30' },
  { id: '21:00:00', text: '21:00' },
  { id: '21:30:00', text: '21:30' },
  { id: '22:00:00', text: '22:00' },
  { id: '22:30:00', text: '22:30' },
  { id: '23:00:00', text: '23:00' },
  { id: '23:30:00', text: '23:30' },
  { id: '00:00:00', text: '00:00' },
];

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
  return (dispatch) => {
    const body = {
      title,
      description,
      start_date,
      period,
      number_of_students,
      tuition_fee,
      currency,
      is_free,
      week_day_schedules_attributes,
      is_same_period,
      category_id,
      cover_image
    };
    dispatch({
      type: asyncActs.CREATE_NEW_COURSE,
      payload: Network().post('courses', body)
    });
  };
};

export const updateCourse = (id, title, description, start_date, period,
  number_of_students, tuition_fee, currency, is_free, week_day_schedules_attributes, is_same_period,
  category_id, cover_image) => {
  return (dispatch) => {
    const body = {
      id,
      title,
      description,
      start_date,
      period,
      number_of_students,
      tuition_fee,
      currency,
      is_free,
      week_day_schedules_attributes,
      is_same_period,
      cover_image,
      category_id
    };
    dispatch({
      type: asyncActs.UPDATE_COURSE,
      payload: Network().update(`courses/${id}`, body)
    });
  };
};

export const loadCourseDetail = (courseId) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_DETAIL_COURSE,
      payload: Network().get(/courses/ + courseId)
    });
    dispatch(loadListSection(courseId));
  };
};

export const createNewCourse = () => {
  return {
    type: CREATE_NEW_COURSE
  };
};

export const activatedEditField = (fieldIds) => {
  return {
    type: TRIGGER_ACTIVATE_FIELD,
    data: fieldIds
  };
};

export const closedEditField = (fieldId) => {
  return {
    type: CLOSED_ACTIVATED_FIELD,
    data: fieldId
  };
};

export const loadListSection = (courseId) => {
  return {
    type: FETCH_LIST_SECTION,
    payload: Network().get(`/course_sections?course_id=${courseId}`)
  };
};

export const publishCourse = (courseId) => {
  return {
    type: PUBLISH_COURSE,
    payload: Network().post('courses/publish', courseId)
  };
};

export const validateBeforePublishCCourse = () => {
  return {
    type: VALIDATE_BEFORE_PUBLISH_COURSE
  };
};

/**
 * Defined all action methods to handle Section
 */
export const addNewSection = () => {
  return {
    type: ADD_NEW_SECTION
  };
};

export const closePopupSection = () => {
  return {
    type: CLOSE_POPUP_ADD_SECTION
  };
};

export const deleteSection = (id) => {
  return {
    type: DELETE_SECTION,
    payload: Network().delete(`course_sections/${id}`)
  };
};
