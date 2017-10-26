import {
    DOWNLOAD_UPLOADED_DOCUMENT, RECEIVE_DRGREES_DATA, RECEIVE_EDUCATION_DATA,
    REMOVE_UPLOADED_DOCUMENT
} from "actions/TutorAccountService";

const loadEducationData = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_EDUCATION_DATA:
            return {
                ...state,
                degrees: action.data.degrees,
                certificates: action.data.certificates,
                skills: action.data.skills,
                level: action.data.level
            }
        case REMOVE_UPLOADED_DOCUMENT:
            let uploadedFiles = state['degrees'].slice();
            let removedDoc = uploadedFiles.filter(doc => doc.uid === action.data);
            uploadedFiles.splice(uploadedFiles.indexOf(removedDoc), 1);
            return Object.assign({}, {degrees: uploadedFiles});
        case RECEIVE_DRGREES_DATA:
            return {
                ...state,
                listLevel: action.data.listLevel
            }
        default:
            return state
    }
}

export default loadEducationData;