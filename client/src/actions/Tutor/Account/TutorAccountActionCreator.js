import Network from "utils/network";
import { TutorAccountTypes } from '../../../constants/index'
import { CERTIFICATE } from '../../../actions/AsyncActionCreator';

export const RECEIVE_EDUCATION_DATA = 'RECEIVE_EDUCATION_DATA';
export const RECEIVE_SKILLS_DATA = 'RECEIVE_SKILLS_DATA';
export const RECEIVE_CERTIFICATES_DATA = 'RECEIVE_CERTIFICATES_DATA';
export const ADD_NEW_DOCUMENT_FILE = 'ADD_NEW_DOCUMENT_FILE';
export const REMOVE_NEW_DOCUMENT_FILE = 'REMOVE_NEW_DOCUMENT_FILE';
export const REMOVE_UPLOADED_DOCUMENT = 'REMOVE_UPLOADED_DOCUMENT';
export const DOWNLOAD_UPLOADED_DOCUMENT = 'DOWNLOAD_UPLOADED_DOCUMENT';
export const SAVE_PERSON_DATA = 'SAVE_PERSON_DATA';

export const loadDegrees = () => {
  return {
    type: CERTIFICATE.load_tutor_certificate_list,
    payload: Network().get('degrees')
  }
}

export const addNewDocument = (file) => {
  return {
    type: CERTIFICATE.upload_new_document,
    payload: Network().post('degrees', {degree: {item: file.content, name: file.fileName}})
  }
}

export const removeUploadedDocument = (documentId) => {
  return {
    type: CERTIFICATE.remove_uploaded_certificate,
    payload: Network().delete(`degrees/${documentId}`)
  }
}

export const updateTutorEducation = (id, data) => {
  return dispatch => {
    Network().update(`tutors/${id}`, data).then((response) => {
      dispatch({
        type: TutorAccountTypes.UPDATE_TUTOR_EDU,
        payload: response
      })
      dispatch(hideEducationEditForm())
    });
  }
}

export const fetchTutor = (userId) => {
  return dispatch => {
    Network().get('tutors/tutor_by_user', {user_id: userId})
      .then((data) => {
        dispatch({
          type: TutorAccountTypes.SET_ACCOUNT_TUTOR,
          payload: data
        })
      })
  }
}

export const showEducationEditForm = () => {
  return {
    type: TutorAccountTypes.ENABLE_EDIT_TUTOR_EDUCATION_MODE
  }
}

export const hideEducationEditForm = () => {
  return {
    type: TutorAccountTypes.DISABLE_EDIT_TUTOR_EDUCATION_MODE
  }
}