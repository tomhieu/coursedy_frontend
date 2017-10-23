import {RECEIVE_DRGREES_DATA, RECEIVE_EDUCATION_DATA, RECEIVE_PERSON_DATA} from "actions/TutorAccountService";
import {combineReducers} from "redux";

const loadPersonData = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PERSON_DATA:
            return {
                ...state,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                email: action.data.email,
                address: action.data.address,
                birthDate: action.data.birthDate
            }
        default:
            return state;
    }
}

export default loadPersonData;