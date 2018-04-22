import * as types from '../constants/Courses'
import * as sessionTypes from '../constants/Session'
import Network from '../utils/network'
import {globalHistory} from '../utils/globalHistory'
import {TT} from '../utils/locale'
import * as PublicCourseConstants from "../constants/PublicCourseConstants"

export const fetchPublicCourse = (courseId) => {
  return dispatch => {
    Network().get('courses/'+courseId).then((response) => {
      dispatch(fetchPublicCourseSections(courseId))
      dispatch(fetchPublicCourseTutor(response.user.id))

      //Dispatch submit view after timeout
      setTimeout(() => {
        dispatch(submitViewCourse(courseId, response.token || ''))
      }, PublicCourseConstants.PUBLIC_COURSE_DETAIL_SUBMIT_VIEW_TIMEOUT)
      dispatch({
        type: types.FETCH_PUBLIC_COURSE_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors :
        [TT.t('fetch_course_fail')]

      //TODO tinhuynh: Fix me after API server return 404 error
      //Redirect to 404 page
      if (error_messages.indexOf("course not found") >= 0) {
        globalHistory.push('/404')
      } else {
        dispatch({
          type: types.FETCH_PUBLIC_COURSE_FAIL,
          payload: {errors: error_messages}
        })  
      }
      
    })

    //FIXME: Remove me
    // dispatch({
    //   type: asyncActs.FETCH_PUBLIC_COURSE_SUCCESSFULLY,
    //   payload: asyncActs.dummyCourse
    // })

  }
}

export const fetchPublicCourseSections = (courseId) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_PUBLIC_COURSE_SECTIONS,
      payload: Network().get('course_sections', {course_id: courseId})
    })
  }
}

export const fetchPublicCourseTutor = (tutorId) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_PUBLIC_COURSE_TUTOR,
      payload: Network().get('tutors/tutor_by_user', {user_id: tutorId})
    })
  }
}

export const showPublicCourseFollowModal = (page = 'detail') => {
  return dispatch => {
    if (page == 'list') {
      dispatch({
        type: types.PUBLIC_COURSE_LIST_SHOW_FOLLOW_MODAL,
      })  
    } else if (page == 'detail')
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_SHOW_FOLLOW_MODAL,
      })  
  }
}
export const closePublicCourseFollowModal = (page = 'detail') => {
  return dispatch => {
    if (page == 'list') {
      dispatch({
        type: types.PUBLIC_COURSE_LIST_CLOSE_FOLLOW_MODAL,
      })  
    } else if (page == 'detail') {
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_CLOSE_FOLLOW_MODAL,
      })
    }
    
  }
}
export const showPublicCourseFollowStatusModal = (page = 'detail') => {
  return dispatch => {
    if (page == 'list') {
      dispatch({
        type: types.PUBLIC_COURSE_LIST_SHOW_FOLLOW_STATUS_MODAL,
      })  
    } else if (page == 'detail') {
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_SHOW_FOLLOW_STATUS_MODAL,
      })
    }
    
  }
}
export const closePublicCourseFollowStatusModal = (page = 'detail') => {
  return dispatch => {
    if (page == 'list') {
      dispatch({
        type: types.PUBLIC_COURSE_LIST_CLOSE_FOLLOW_STATUS_MODAL,
      })  
    } else if (page == 'detail') {
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_CLOSE_FOLLOW_STATUS_MODAL,
      })
    }
    
  }
}
// export const showPublicRequireLoginModal = (message) => {
//   return dispatch => {
//     dispatch({
//       type: types.PUBLIC_COURSE_SHOW_REQUIRE_LOGIN_MODAL,
//       payload: message
//     })
//   }
// }
// export const closePublicRequireLoginModal = () => {
//   return dispatch => {
//     dispatch({
//       type: types.PUBLIC_COURSE_CLOSE_REQUIRE_LOGIN_MODAL,
//     })
//   }
// }

export const showPublicEnrollStatusModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_SHOW_ENROLL_STATUS_MODAL,
    })
  }
}
export const closePublicEnrollStatusModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_CLOSE_ENROLL_STATUS_MODAL,
    })
  }
}
export const submitFollowEmail = (courses = [], email = '', page = 'detail') => {
  const params = {
    courses: courses,
    email: email
  }
  return dispatch => {
    Network().post('courses/follow', params).then((response) => {
      if (page == 'list') {
        dispatch({
          type: types.PUBLIC_COURSE_LIST_SUBMIT_FOLLOW_SUCCESSFULLY,
          payload: response
        })  
      } else if (page == 'detail') {
        dispatch({
          type: types.PUBLIC_COURSE_DETAIL_SUBMIT_FOLLOW_SUCCESSFULLY,
          payload: response
        })
      }
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors :
        [TT.t('submit_follow_fail')]
      if (page == 'list') {
        dispatch({
          type: types.PUBLIC_COURSE_LIST_SUBMIT_FOLLOW_FAILL,
          payload: {errors: error_messages}
        })  
      } else if (page == 'detail') {
        dispatch({
          type: types.PUBLIC_COURSE_DETAIL_SUBMIT_FOLLOW_FAILL,
          payload: {errors: error_messages}
        })
      }
      
    })
  }
}

export const submitEnrollCourse = (courseId) => {
  return dispatch => {
    Network().post('courses/'+courseId+'/enroll', {}).then((response) => {
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors : {errors: [{status_code: 1, message: TT.t('submit_enroll_fail')}]}
      //FIXME: Comment for dummy data
      // dispatch({
      //   type: asyncActs.PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_FAILL,
      //   payload: {errors: error_messages}
      // })

      //FIXME: Remove me
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_SUBMIT_ENROLL_FAILL,
        payload: {errors: [{
          status_code: 2,
          message: "Không đủ số dư"
        }]}
      })      
    })
  }
}

export const redirectAfterLogin = (pageForSuccess, pageForFail = '/') => {
  return dispatch => {
    globalHistory.push('/login');
    dispatch({
      type: sessionTypes.SET_REDIRECT_PAGE,
      payload: pageForSuccess
    })
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

export const fetchCourseComments = (courseId, page = 1) => {
  const params = {
    per_page: types.PUBLIC_COURSE_MAX_NUMBER_COMMENTS_PER_LOAD,
    page: page
  }
  return dispatch => {
    Network().get(`courses/${courseId}/comments`, params).then((response) => {
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_FETCH_COMMENTS_SUCCESSFULLY,
        payload: {
          comments: response,
          page: page
        }
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors :
        [TT.t('fetch_comments_fail')]
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_FETCH_COMMENTS_FAIL,
        payload: {errors: error_messages}
      })
    })
  }
}

export const submitCourseComment = (comment, courseId, userId) => {
  const params = {
    content: comment
  }
  return dispatch => {
    Network().post(`courses/${courseId}/comments`, params).then((response) => {
      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT_SUCCESSFULLY,
        payload: response
      })
    }, (errors) => {
      const error_messages = (errors && errors.constructor == Array && errors.length > 0) ?
        errors :
        [TT.t('submit_comment_fail')]

      dispatch({
        type: types.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT_FAIL,
        payload: {errors: error_messages}
      })
    })
  }
}

export const showPublicSubmitCommentStatusModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT_SHOW_STATUS_MODAL,
    })
  }
}
export const closePublicSubmitCommentStatusModal = () => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_DETAIL_SUBMIT_COMMENT_CLOSE_STATUS_MODAL,
    })
  }
}

export const submitViewCourse = (courseId, token) => {
  return dispatch => {
    dispatch({
      type: types.PUBLIC_COURSE_DETAIL_SUBMIT_VIEW,
      payload: Network().post(`courses/${courseId}/view`, {token: token})
    })
  }
}