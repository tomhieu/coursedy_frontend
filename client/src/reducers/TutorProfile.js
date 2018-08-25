import * as types from '../constants/TutorProfile';

const TutorProfile = (state = {
  tutor: {}
}, action) => {
  switch (action.type) {
    case types.FETCH_TUTOR_SUCCESS:
      return { ...state, tutor: action.payload };
    case types.UPDATE_TUTOR_SUCCESS:
      return { ...state, tutor: action.payload };
    case types.UPDATE_TUTOR_FAILED:
      return state;
    default:
      return state;
  }
};

export default TutorProfile;
