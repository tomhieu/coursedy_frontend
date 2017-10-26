import {ADD_NEW_DOCUMENT_FILE} from "../actions/TutorAccountService";

const addNewDocumentFile = (state = {uploadFiles: []}, action) => {
    switch (action.type) {
        case ADD_NEW_DOCUMENT_FILE:
            let newUploadFiles = state['uploadFiles'].slice();
            newUploadFiles.push(action.payload);
            return Object.assign({}, {uploadFiles: newUploadFiles})
        default:
            return state
    }
}

export default addNewDocumentFile;