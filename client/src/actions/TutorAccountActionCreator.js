import Network from "utils/network";
import { TutorAccountTypes } from '../constants/index'
import { CERTIFICATE } from '../actions/AsyncActionCreator.js';

export const RECEIVE_PERSON_DATA = 'RECEIVE_PERSON_DATA';
export const RECEIVE_EDUCATION_DATA = 'RECEIVE_EDUCATION_DATA';
export const RECEIVE_DRGREES_DATA = 'RECEIVE_DEGREES_DATA';
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

export const loadListSkillData = () => {
  return dispatch => {
    Network().get('categories').then((response) => {
      dispatch({
        type: RECEIVE_SKILLS_DATA,
        data: response.map((category) => {
          return {id: category.id,  text: category.name}
        })
      })
    });
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

export const fetchUser = () => {
  return dispatch => {
    Network().get('current_user')
      .then((data) => {
        dispatch({
          type: TutorAccountTypes.SET_ACCOUNT_USER,
          payload: data
        })

        dispatch(fetchTutor(data.id))
      })
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

export const closeEmailConfirmationModal = () => {
  return {
    type: TutorAccountTypes.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL
  }
}

export const savePersonData = (name, email, date_of_birth, address, gender, emailChanged) => {
  let body = {name, email, date_of_birth, address, gender}
  return dispatch => {
    Network().update('/auth', body).then((response) => {
      if (emailChanged){
        dispatch({
          type: TutorAccountTypes.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL
        })
      }
      dispatch({
        type: TutorAccountTypes.SET_ACCOUNT_USER,
        payload: response
      })
      dispatch(hideProfileEditForm())
    })
  }
}

export const showProfileEditForm = () => {
  return {
    type: TutorAccountTypes.ENABLE_EDIT_TUTOR_PROFILE_MODE
  }
}

export const hideProfileEditForm = () => {
  return {
    type: TutorAccountTypes.DISABLE_EDIT_TUTOR_PROFILE_MODE
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