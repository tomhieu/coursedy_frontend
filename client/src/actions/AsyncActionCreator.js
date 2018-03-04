export const FULFILLED = '_FULFILLED';
export const PENDING = '_PENDING';
export const REJECTED = '_REJECTED';

import {SHOW_LOADING_MASK} from "./actionCreators";
import Network from '../utils/network'
import {HIDE_LOADING_MASK} from "actions/actionCreators";

export const FULFILLED = '_FULFILLED';
export const PENDING = '_PENDING';
export const REJECTED = '_REJECTED';

/**
 * Define all actions for Course
 * @type {string}
 */
export const FETCH_DETAIL_COURSE = 'FETCH_DETAIL_COURSE';
export const CANCEL_PUBLISH_COURSE = 'CANCEL_PUBLISH_COURSE';
export const VALIDATE_BEFORE_PUBLISH_COURSE = 'VALIDATE_BEFORE_PUBLISH_COURSE';
export const TRIGGER_ACTIVATE_FIELD = 'TRIGGER_ACTIVATE_FIELD';
export const CLOSED_ACTIVATED_FIELD = 'CLOSED_ACTIVATED_FIELD';
/**
 * Define actions to create, edit or delete Section
 */
export const FETCH_LIST_SECTION = 'FETCH_LIST_SECTION';
export const ADD_NEW_SECTION = 'ADD_NEW_SECTION';
export const CLOSE_POPUP_ADD_SECTION = 'CLOSE_POPUP_ADD_SECTION';
export const DELETE_SECTION = 'DELETE_SECTION';
export const CREATE_UPDATE_SECTION = 'CREATE_UPDATE_SECTION';

/**
 * publish course Action
 */
export const PUBLISH_COURSE = 'PUBLISH_COURSE';
export const CREATE_NEW_COURSE = 'CREATE_NEW_COURSE'
export const CREATE_COURSE_FAILED = 'CREATE_COURSE_FAILED'

export const UPDATE_COURSE_SUCCESSFULLY = 'UPDATE_COURSE_SUCCESSFULLY'
export const UPDATE_COURSE_FAILED = 'UPDATE_COURSE_FAILED'

/**
 * Define actions of Lesson
 * @type {string}
 */
export const ADD_MORE_LESSON_FOR_SECTION = 'ADD_MORE_LESSON_FOR_SECTION';
export const DELETE_LESSON = 'DELETE_LESSON';
export const SAVE_LESSON_DETAIL = 'SAVE_LESSON_DETAIL';
export const HIDE_LESSON_POPUP_EDIT = 'HIDE_LESSON_POPUP_EDIT';
export const SAVE_LESSON = 'SAVE_LESSON';
export const ADD_DOCUMENT_FOR_LESSON = 'ADD_DOCUMENT_FOR_LESSON';
export const DELETE_DOCUMENT_FOR_LESSON = 'DELETE_DOCUMENT_FOR_LESSON';

/**
 * Define actions of Tutor
 * @type {string}
 */
export const FETCH_TUTOR_COURSES = 'FETCH_TUTOR_COURSES';
export const FETCH_TUTOR_COURSES_FAIL = 'FETCH_TUTOR_COURSES_FAIL';

/**
 * Define actions to load Reference Data
 * @type {string}
 */
export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const FETCH_LOCATIONS = "FETCH_LOCATIONS"
export const FETCH_WEEKDAYS = "FETCH_WEEKDAYS"

/**
 * Define actions of Course Filter page
 * @type {string}
 */
export const CHANGE_DISPLAY_MODE = "CHANGE_DISPLAY_MODE"
export const CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE"
export const CHANGE_SORT_BY = "CHANGE_SORT_BY"
export const SELECT_COURSE = "SELECT_COURSE"
export const SELECT_ALL_COURSES = "SELECT_ALL_COURSES"
export const REMOVE_COURSE = "REMOVE_COURSE"
export const REMOVE_ALL_COURSES = "REMOVE_ALL_COURSES"
export const LOAD_SUGGESTION = "LOAD_SUGGESTION"
export const UPDATE_FILTER_CRITERIA = "UPDATE_FILTER_CRITERIA"