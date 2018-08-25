import * as asyncActions from '../actions/AsyncActionCreator.js';
import { CERTIFICATE } from '../actions/AsyncActionCreator.js';

const Certificate = (state = {
  certificates: []
}, action) => {
  switch (action.type) {
    case CERTIFICATE.load_tutor_certificate_list + asyncActions.FULFILLED:
      return { ...state, certificates: action.payload };
    case CERTIFICATE.remove_uploaded_certificate + asyncActions.FULFILLED:
      return { ...state, certificates: state.certificates.filter((c) => { return c.id != action.payload.id; }) };
    case CERTIFICATE.upload_new_document + asyncActions.FULFILLED:
      return { ...state, certificates: state.certificates.slice().concat(action.payload) };
    default:
      return state;
  }
};

export default Certificate;
