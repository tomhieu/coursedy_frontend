import {FETCH_TUTOR_COURSES_FAIL, FETCH_TUTOR_COURSES_SUCCESS} from "../../actions/ListTutorCourseActionCreator";
const TutorCourseList = (state = {
    courses: []
}, action) => {
    switch (action.type) {
        case FETCH_TUTOR_COURSES_SUCCESS:
            return {...state, courses: action.payload }
        case FETCH_TUTOR_COURSES_FAIL:
            return {...state, courses: [] }
        default:
            return state;
    }
};

export default TutorCourseList;