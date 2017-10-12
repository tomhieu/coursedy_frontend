import {RECEIVE_EDUCATION_DATA, RECEIVE_PERSON_DATA} from "actions/TutorAccountService";

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
        case RECEIVE_EDUCATION_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}


export default loadPersonData;