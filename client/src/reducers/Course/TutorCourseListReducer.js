import {FETCH_TUTOR_COURSES_FAIL, FETCH_TUTOR_COURSES_SUCCESS} from "../../actions/ListTutorCourseActionCreator";
const TutorCourseList = (state = {
    courses: []
}, action) => {
    switch (action.type) {
        case FETCH_TUTOR_COURSES_SUCCESS:
            const newCourses = action.payload.map((course) => Object.assign({}, course, {onlyTutor: true}));
            return {...state, courses: newCourses }
        case FETCH_TUTOR_COURSES_FAIL:
            return {...state, courses: [] }
        default:
            return state;
    }
};

export default TutorCourseList;