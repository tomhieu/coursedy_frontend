import {
  TutorAccountTypes
} from "../constants/index";

const loadPersonData = (state = {}, action) => {
  switch (action.type) {
    case TutorAccountTypes.RECEIVE_PERSON_DATA:
      return {
        ...state,
        data: {
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          email: action.data.email,
          address: action.data.address,
          birthDate: action.data.birthDate
        }
      }
    default:
      return state;
  }
}

export default loadPersonData;