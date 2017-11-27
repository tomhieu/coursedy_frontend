import Network from "utils/network";
import * as types from '../constants/TutorAccount'

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
export const COMPLETE_UPDATE_PASSWORD = 'COMPLETE_UPDATE_PASSWORD';


export const loadListDegreesData = () => {
  return {
    type: RECEIVE_DRGREES_DATA,
    data: listDegrees
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

export const downloadDegree = (degreeId) => {
  return dispatch => {
    Network().get('/account/tutor/degree/download?degreeId' + degreeId);
  }
}

export const deleteDegree = (degreeId) => {
  return "";
//    return Network().delete('/account/tutor/degree/delete?degreeId' + degreeId);
}

export const addNewDocument = (file) => {
  return {
    type: ADD_NEW_DOCUMENT_FILE,
    payload: file
  }
}

export const removeNewDocument = (fileId) => {
  return {
    type: REMOVE_NEW_DOCUMENT_FILE,
    data: fileId
  }
}

export const removeUploadedDocument = (documentId) => {
  return {
    type: REMOVE_UPLOADED_DOCUMENT,
    data: documentId
  }
}

export const removeSkill = (skillId) => {
  return {
    type: REMOVE_NEW_DOCUMENT_FILE,
    data: fileId
  }
}

export const removeCertificate = (certificateId) => {
  return {
    type: REMOVE_UPLOADED_DOCUMENT,
    data: documentId
  }
}

export const updatePassword = (data) => {
  dispatch => {
    Network().post('/account/tutor/change/password', data).then((response) => {
      dispatch({
        type: COMPLETE_UPDATE_PASSWORD
      })
    });
  }
}


export const updateTutorEducation = (id, data) => {
  return dispatch => {
    Network().update(`tutors/${id}`, data).then((response) => {
      dispatch({
        type: types.UPDATE_TUTOR_EDU,
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
          type: types.SET_ACCOUNT_USER,
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
          type: types.SET_ACCOUNT_TUTOR,
          payload: data
        })
      })
  }
}

export const closeEmailConfirmationModal = () => {
  return {
    type: types.HIDE_REQUIRED_EMAIL_CONFIRMATION_MODAL
  }
}

export const savePersonData = (name, email, date_of_birth, address, gender, emailChanged) => {
  let body = {name, email, date_of_birth, address, gender}
  return dispatch => {
    Network().update('/auth', body).then((response) => {
      if (emailChanged){
        dispatch({
          type: types.SHOW_REQUIRED_EMAIL_CONFIRMATION_MODAL
        })
      }
      dispatch({
        type: types.SET_ACCOUNT_USER,
        payload: response
      })
      dispatch(hideProfileEditForm())
    })
  }
}

export const showProfileEditForm = () => {
  return {
    type: types.ENABLE_EDIT_TUTOR_PROFILE_MODE
  }
}

export const hideProfileEditForm = () => {
  return {
    type: types.DISABLE_EDIT_TUTOR_PROFILE_MODE
  }
}

export const showEducationEditForm = () => {
  return {
    type: types.ENABLE_EDIT_TUTOR_EDUCATION_MODE
  }
}

export const hideEducationEditForm = () => {
  return {
    type: types.DISABLE_EDIT_TUTOR_EDUCATION_MODE
  }
}

export const showPasswordEditForm = () => {
  return {
    type: types.ENABLE_EDIT_TUTOR_PASSWORD_MODE
  }
}

export const hidePasswordEditForm = () => {
  return {
    type: types.DISABLE_EDIT_TUTOR_PASSWORD_MODE
  }
}
