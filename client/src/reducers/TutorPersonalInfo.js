import {RECEIVE_DRGREES_DATA, RECEIVE_EDUCATION_DATA, RECEIVE_PERSON_DATA} from "actions/TutorAccountService";
import {TEST_CHANGE_NAME} from "../actions/TutorAccountService";

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
        case TEST_CHANGE_NAME:
            return Object.assign({}, state, {firstName: Math.random().toString(36).substring(7)})
        default:
            return state;
    }
}

export default loadPersonData;