export const FULFILLED = '_FULFILLED';
export const PENDING = '_PENDING';
export const REJECTED = '_REJECTED';
export const HEADERS = '_HEADERS';

export const CERTIFICATE = {
  load_tutor_certificate_list: 'LOAD_TUTOR_CERTIFICATE_LIST',
  remove_uploaded_certificate: 'REMOVE_UPLOADED_CERTIFICATE',
  upload_new_document: 'UPLOAD_NEW_DOCUMENT'
}

export const ACCOUNT = {
  enable_edit_password_mode: 'ENABLE_EDIT_PASSWORD_MODE',
  disable_edit_password_mdode: 'DISABLE_EDIT_PASSWORD_MODE',
  complete_updating_password: 'COMPLETE_UPDATE_PASSWORD'
}

/**
 * Define general action to manage async actions
 * @type {string}
 */
export const ADD_ASYNC_ACTION = 'ADD_ASYNC_ACTION';
export const REMOVE_ASYNC_ACTION = 'REMOVE_ASYNC_ACTION';


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
export const CLOSE_COURSE_POPUP = 'CLOSE_COURSE_POPUP'
export const EDIT_TEACHING_DAY = 'EDIT_TEACHING_DAY'
export const EDIT_COURSE_CATEGORY = 'EDIT_COURSE_CATEGORY'

export const UPDATE_COURSE = 'UPDATE_COURSE'
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
 * define actions for Document
 */
export const ADD_DOCUMENT = 'ADD_DOCUMENT';
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';

/**
 * Define actions of Tutor
 * @type {string}
 */
export const FETCH_TUTOR_COURSES = 'FETCH_TUTOR_COURSES';
export const DELETE_COURSE = 'DELETE_COURSE';

/**
 * Define actions of Tutor
 * @type {string}
 */
export const FETCH_STUDENT_ENROLL_COURSES = 'FETCH_STUDENT_ENROLL_COURSES';
export const FETCH_STUDENT_FOLLOW_COURSES = 'FETCH_STUDENT_FOLLOW_COURSES';

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
export const CLEAR_SUGGESTION = "CLEAR_SUGGESTION"
export const CLOSE_COURSE_FILTER_SUGGESTION = "CLOSE_COURSE_FILTER_SUGGESTION"

/**
 * Define actions of Teachers page
 */
export const LOAD_SUGGESTION_TEACHERS = 'LOAD_SUGGESTION_TEACHERS'
export const UPDATE_FILTER_CRITERIA_TEACHERS = "UPDATE_FILTER_CRITERIA_TEACHERS"
export const FETCH_TEACHER_SKILL_SET = 'FETCH_TEACHER_SKILL_SET'
/**
 * Define actions of Homepage
 */
export const TOP_TEACHERS = "TOP_TEACHERS";

/**
 * Define actions of payment
 */
export const FETCH_USER_BALANCE = "FETCH_USER_BALANCE"
export const FETCH_PAYMENT_HISTORY = "FETCH_PAYMENT_HISTORY"


/**
 * Define actions of login/register
 */
export const LOGIN = "LOGIN"
export const SIGN_OUT = "SIGN_OUT"
export const REGISTER = "REGISTER"
export const FETCH_TEACHERS = 'FETCH_TEACHERS'

/**
 * Define actions course detail
 */
export const STORE_COURSE_FOLLOW = 'STORE_COURSE_FOLLOW'

/**
 * Define actions teacher detail
 */
export const FETCH_TEACHER_DETAIL = 'FETCH_TEACHER_DETAIL'
export const FETCH_TEACHER_EDUCATIONS = 'FETCH_TEACHER_EDUCATIONS'
export const FETCH_TEACHER_WORK_EXPERIENCES = 'FETCH_TEACHER_WORK_EXPERIENCES'
export const FETCH_TEACHER_REVIEWS = 'FETCH_TEACHER_REVIEWS'
export const FETCH_TEACHER_COURSES = 'FETCH_TEACHER_COURSES'
