import Network from "utils/network";
import { 
  AccountTypes,
  TutorAccountTypes 
} from '../../../constants/index'

export const loadListDegreesData = () => {
  return {
    type: TutorAccountTypes.RECEIVE_DRGREES_DATA,
    data: listDegrees
  }
}

export const loadListSkillData = () => {
  return dispatch => {
    Network().get('categories').then((response) => {
      dispatch({
        type: TutorAccountTypes.RECEIVE_SKILLS_DATA,
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
    type: TutorAccountTypes.ADD_NEW_DOCUMENT_FILE,
    payload: file
  }
}

export const removeNewDocument = (fileId) => {
  return {
    type: TutorAccountTypes.REMOVE_NEW_DOCUMENT_FILE,
    data: fileId
  }
}

export const removeUploadedDocument = (documentId) => {
  return {
    type: TutorAccountTypes.REMOVE_UPLOADED_DOCUMENT,
    data: documentId
  }
}

export const removeSkill = (skillId) => {
  return {
    type: TutorAccountTypes.REMOVE_NEW_DOCUMENT_FILE,
    data: fileId
  }
}

export const removeCertificate = (certificateId) => {
  return {
    type: TutorAccountTypes.REMOVE_UPLOADED_DOCUMENT,
    data: documentId
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
          type: AccountTypes.SET_ACCOUNT_USER,
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
