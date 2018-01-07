export const FETCH_CATEGORIES_SUCCESSFULLY = "FETCH_CATEGORIES_SUCCESSFULLY"
export const FETCH_LOCATIONS_SUCCESSFULLY = "FETCH_LOCATIONS_SUCCESSFULLY"
export const FETCH_WEEKDAYS_SUCCESSFULLY = "FETCH_WEEKDAYS_SUCCESSFULLY"
export const CHANGE_DISPLAY_MODE = "CHANGE_DISPLAY_MODE"
export const CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE"
export const CHANGE_SORT_BY = "CHANGE_SORT_BY"
export const SELECT_COURSE = "SELECT_COURSE"
export const SELECT_ALL_COURSES = "SELECT_ALL_COURSES"
export const REMOVE_COURSE = "REMOVE_COURSE"
export const REMOVE_ALL_COURSES = "REMOVE_ALL_COURSES"
export const LOAD_SUGGESTION_COMPLETE = "LOAD_SUGGESTION_COMPLETE"
export const ADD_FILTER_CRITERIA = "ADD_FILTER_CRITERIA"
export const REMOVE_FILTER_CRITERIA = "REMOVE_FILTER_CRITERIA"

export const timeSlots = [
  [6, '6:00 AM'],
  [6.5, '6:30 AM'],
  [7.0, '7:00 AM'],
  [7.5, '7:30 AM'],
  [8.0, '8:00 AM'],
  [8.5, '8:30 AM'],
  [9.0, '9:00 AM'],
  [10.5, '10:30 AM'],
  [11.0, '11:00 AM'],
  [11.5, '11:30 AM'],
  [12.0, '12:00 AM'],
  [12.5, '12:30 AM'],
  [13.0, '1:00 PM'],
  [13.5, '1:30 PM'],
  [14.0, '2:00 PM'],
  [14.5, '2:30 PM'],
  [15.0, '4:00 PM'],
  [15.5, '3:30 PM'],
  [16.0, '4:00 PM'],
  [16.5, '4:30 PM'],
  [17.0, '5:00 PM'],
  [17.5, '5:30 PM'],
  [18.0, '6:00 PM'],
  [18.5, '6:30 PM'],
  [19.0, '7:00 PM'],
  [19.5, '7:30 PM'],
  [20.0, '8:00 PM'],
  [20.5, '8:30 PM'],
  [21.0, '9:00 PM'],
  [21.5, '9:30 PM'],
  [22.0, '10:00 PM'],
  [22.5, '10:30 PM'],
  [23.0, '11:00 PM'],
  [23.5, '11:30 PM']
]

export const tuitionFees = [
    {id: 0, text: 'Dưới 1tr'},
    {id: 1000000, text: '1tr - 5tr'},
    {id: 5000000, text: '5tr - 10tr'},
    {id: 10000000, text: 'Trên 10tr'}
]

//FIXME: Remove me
export const dummyCourses = [
  {
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
  }, {
    id: 1,
    category_id : 2,
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
    title: "Course 2",
    tuesday_end_time: "2017-12-30T09:30:06.302Z",
    tuesday_start_time: "2017-12-30T07:30:59.884Z",
    tuition_fee: "2000000",
    user: {
      id: 1,
      avatar: 'http://placehold.it/100x100',
      first_name: 'Tin',
      last_name: 'Huynh'
    }
  }, {
    id : 3,
    category_id : 3,
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
    title: "Course 3",
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
];

