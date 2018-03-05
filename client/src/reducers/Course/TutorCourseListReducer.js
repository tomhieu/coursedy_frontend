import * as asyncActs from "../../actions/AsyncActionCreator";
import {TT} from "utils/locale";
const TutorCourseList = (state = {
  courses: [],
  errors: []
}, action) => {
    switch (action.type) {
        case asyncActs.FETCH_TUTOR_COURSES + asyncActs.FULFILLED:
            const newCourses = action.payload.map((course) => Object.assign({}, course, {onlyTutor: true}));
            return {...state, courses: newCourses }
        case asyncActs.FETCH_TUTOR_COURSES + asyncActs.REJECTED:
          const error_messages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
            errors : [TT.t('fetch_course_fail')];
            return {...state, courses: [], errors: error_messages }
        default:
            return state;
    }
};

export default TutorCourseList;
