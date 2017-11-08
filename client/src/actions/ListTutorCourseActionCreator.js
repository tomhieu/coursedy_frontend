export const FETCH_TUTOR_COURSES_SUCCESS = 'FETCH_TUTOR_COURSES_SUCCESS';
export const FETCH_TUTOR_COURSES_FAIL = 'FETCH_TUTOR_COURSES_FAIL';

export const fetchListTutorCourse = () => {
    return dispatch => {
        dispatch({
            type: FETCH_TUTOR_COURSES_SUCCESS,
            payload: [1,2,3,4,5,6,7,8,9].map(value => {
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