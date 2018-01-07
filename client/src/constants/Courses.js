export const PERIOD_TYPES = ["hour", "day", "week", "month"]
export const CURRENCIES = ['vnd', 'usd', 'yen']

export const FETCH_COURSES = 'FETCH_COURSES'
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS'
export const FETCH_COURSES_FAIL = 'FETCH_COURSES_FAIL'

export const FETCH_PUBLIC_COURSE_SUCCESSFULLY = 'FETCH_PUBLIC_COURSE_SUCCESSFULLY'
export const FETCH_PUBLIC_COURSE_FAIL = 'FETCH_PUBLIC_COURSE_FAIL'

export const FETCH_PUBLIC_COURSE_SECTIONS_SUCCESSFULLY = 'FETCH_PUBLIC_COURSE_SECTIONS_SUCCESSFULLY'
export const FETCH_PUBLIC_COURSE_SECTIONS_FAIL = 'FETCH_PUBLIC_COURSE_SECTIONS_FAIL'

export const FETCH_PUBLIC_COURSE_TUTOR_SUCCESSFULLY = 'FETCH_PUBLIC_COURSE_TUTOR_SUCCESSFULLY'
export const FETCH_PUBLIC_COURSE_TUTOR_FAIL = 'FETCH_PUBLIC_COURSE_TUTOR_FAIL'

//Constants for public course list follow
export const PUBLIC_COURSE_LIST_SHOW_FOLLOW_MODAL = 'PUBLIC_COURSE_LIST_SHOW_FOLLOW_MODAL'
export const PUBLIC_COURSE_LIST_CLOSE_FOLLOW_MODAL = 'PUBLIC_COURSE_LIST_CLOSE_FOLLOW_MODAL'
export const PUBLIC_COURSE_LIST_SUBMIT_FOLLOW_SUCCESSFULLY = 'PUBLIC_COURSE_LIST_SUBMIT_FOLLOW_SUCCESSFULLY'
export const PUBLIC_COURSE_LIST_SUBMIT_FOLLOW_FAILL = 'PUBLIC_COURSE_LIST_SUBMIT_FOLLOW_FAILL'
export const PUBLIC_COURSE_LIST_SUBMIT_ENROLL_SUCCESSFULLY = 'PUBLIC_COURSE_LIST_SUBMIT_ENROLL_SUCCESSFULLY'
export const PUBLIC_COURSE_LIST_SUBMIT_ENROLL_FAILL = 'PUBLIC_COURSE_LIST_SUBMIT_ENROLL_FAILL'
export const PUBLIC_COURSE_LIST_SHOW_FOLLOW_STATUS_MODAL = 'PUBLIC_COURSE_LIST_SHOW_FOLLOW_STATUS_MODAL'
export const PUBLIC_COURSE_LIST_CLOSE_FOLLOW_STATUS_MODAL = 'PUBLIC_COURSE_LIST_CLOSE_FOLLOW_STATUS_MODAL'


//Constants for public course detail follow
export const PUBLIC_COURSE_DETAIL_SHOW_FOLLOW_MODAL = 'PUBLIC_COURSE_DETAIL_SHOW_FOLLOW_MODAL'
export const PUBLIC_COURSE_DETAIL_CLOSE_FOLLOW_MODAL = 'PUBLIC_COURSE_DETAIL_CLOSE_FOLLOW_MODAL'
export const PUBLIC_COURSE_DETAIL_SUBMIT_FOLLOW_SUCCESSFULLY = 'PUBLIC_COURSE_DETAIL_SUBMIT_FOLLOW_SUCCESSFULLY'
export const PUBLIC_COURSE_DETAIL_SUBMIT_FOLLOW_FAILL = 'PUBLIC_COURSE_DETAIL_SUBMIT_FOLLOW_FAILL'
export const PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_SUCCESSFULLY = 'PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_SUCCESSFULLY'
export const PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_FAILL = 'PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_FAILL'
export const PUBLIC_COURSE_DETAIL_SHOW_FOLLOW_STATUS_MODAL = 'PUBLIC_COURSE_DETAIL_SHOW_FOLLOW_STATUS_MODAL'
export const PUBLIC_COURSE_DETAIL_CLOSE_FOLLOW_STATUS_MODAL = 'PUBLIC_COURSE_DETAIL_CLOSE_FOLLOW_STATUS_MODAL'

//Constants for public course enroll
export const PUBLIC_COURSE_TOGGLE_REQUIRE_LOGIN_MODAL = 'PUBLIC_COURSE_TOGGLE_REQUIRE_LOGIN_MODAL'
export const PUBLIC_COURSE_SHOW_REQUIRE_LOGIN_MODAL = 'PUBLIC_COURSE_SHOW_REQUIRE_LOGIN_MODAL'
export const PUBLIC_COURSE_CLOSE_REQUIRE_LOGIN_MODAL = 'PUBLIC_COURSE_CLOSE_REQUIRE_LOGIN_MODAL'
export const PUBLIC_COURSE_TOGGLE_ENROLL_STATUS_MODAL = 'PUBLIC_COURSE_TOGGLE_ENROLL_STATUS_MODAL'
export const PUBLIC_COURSE_SHOW_ENROLL_STATUS_MODAL = 'PUBLIC_COURSE_SHOW_ENROLL_STATUS_MODAL'
export const PUBLIC_COURSE_CLOSE_ENROLL_STATUS_MODAL = 'PUBLIC_COURSE_CLOSE_ENROLL_STATUS_MODAL'


//FIXME: Remove me
export const dummyCourse = {
  id : 1,
  category_id : 1,
  course_days : [0, 1],
  cover_image: "http://placehold.it/1024x768",
  currency: "vnd",
  description: "lorem ipsum",
  end_time: "2017-12-30T06:30:45.784Z",
  is_free: true,
  is_same_period: false,
  monday_end_time: "2017-12-30T06:55:50.063Z",
  monday_start_time: "2017-12-30T05:30:43.794Z",
  number_of_students: "5",
  period: "12",
  start_date: "2018-01-06",
  start_time : "2017-12-30T05:00:40.454Z",
  title: "Course 1",
  tuesday_end_time: "2017-12-30T09:30:06.302Z",
  tuesday_start_time: "2017-12-30T07:30:59.884Z",
  tuition_fee: "2000000",
  user: {
    id: 1,
    avatar: 'http://placehold.it/100x100',
    first_name: 'Tin',
    last_name: 'Huynh'
  }
}