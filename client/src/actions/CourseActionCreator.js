import * as types from '../constants/Courses';
import * as Actions from '../actions/SessionActionCreator'
import Network from '../utils/network'
import {globalHistory} from '../utils/globalHistory'
import {TT} from '../utils/locale'

export const fetchCourses = (params) => {
  console.log('DEBUG: fetchCourses');
  return dispatch => {
    let query = {
      q: '',
      field: '',
      location: '',
      level: ['', '', ''],
      schedule: {
        days: ['', '', ''],
        time: [
          {
            l: '',
            h: '',
          }, {
            l: '',
            h: '',
          }, 
        ]
      },
      price: [
        {
          l: '',
          h: '',
        }, {
          l: '',
          h: '',
        }
      ],
      tutor: '',
    }

    dispatch({
      type: types.FETCH_COURSES_SUCCESS,
      payload: {
        data: [1,2,3,4,5,6,7,8,9].map(value => {
          return {
            id: 1,
            title: 'Khóa học ' + value,
            description: '<p>Mô tả khóa học</p>',
            start_date: 1506835589,
            end_date: 1506835589,
            cover_image: 'http://placehold.it/200x100',
            user_id: 1,
            user: {
              id: 1,
              first_name: 'Berit', 
              last_name: 'Jaleiah',
              avatar: 'https://i.pinimg.com/236x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1--flat-icons-free-icon.jpg'
            },
            is_public: false,
            is_active: true,
            created_at: 1506835589,
            updated_at: 1506835589,
            period: 2,
            period_type: 'week',
            number_of_students: 5,
            tuition_fee: 1000000,
            currency: 'vnd',
            no_comments: 100,  
          }
        })
      }
    })


    //TODO: Call API server
    // Network().get('courses', query).then((response) => {
    //   dispatch({
    //     type: types.FETCH_COURSES_SUCCESS,
    //     payload: response.data
    //   })
    // }, (errors) => {
    //   const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
    //     errors :
    //     [TT.t('fetch_course_fail')]

    //   dispatch({
    //     type: types.FETCH_COURSES_FAIL,
    //     payload: {errors: error_messages}
    //   })
    // })


  }
}

export const fetchCourse = (params) => {
  console.log('DEBUG: fetch course detail');
  return dispatch => {
    dispatch({
      type: types.FETCH_COURSE_SUCCESS,
      payload: {
        data: {
          id: 1,
          title: 'Khóa học 0',
          description: '<p>Mô tả khóa học</p>',
          start_date: 1506835589,
          end_date: 1506835589,
          cover_image: 'http://placehold.it/200x100',
          user_id: 1,
          user: {
            id: 1,
            first_name: 'Berit', 
            last_name: 'Jaleiah',
            avatar: 'https://i.pinimg.com/236x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1--flat-icons-free-icon.jpg'
          },
          is_public: false,
          is_active: true,
          created_at: 1506835589,
          updated_at: 1506835589,
          period: 2,
          period_type: 'week',
          number_of_students: 5,
          tuition_fee: 1000000,
          currency: 'vnd',
          no_comments: 100,  
        }
      }
    })


    //TODO: Call API server
    // Network().get('course/'+params.id, {}).then((response) => {
    //   dispatch({
    //     type: types.FETCH_COURSE_SUCCESS,
    //     payload: response.data
    //   })
    // }, (errors) => {
    //   const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
    //     errors :
    //     [TT.t('fetch_course_fail')]

    //   dispatch({
    //     type: types.FETCH_COURSE_FAIL,
    //     payload: {errors: error_messages}
    //   })
    // })


  }
}

export const clearError = () => {
  return dispatch => {
    dispatch({
      type: types.CLEAR_ERROR,
      payload: {errors: null}
    })
  }
}