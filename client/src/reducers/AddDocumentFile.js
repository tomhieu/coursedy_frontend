import {ADD_NEW_DOCUMENT_FILE} from "../actions/TutorAccountService";
import {REMOVE_NEW_DOCUMENT_FILE} from "actions/TutorAccountService";

const addNewDocumentFile = (state = {uploadFiles: []}, action) => {
    let newUploadFiles = state['uploadFiles'].slice();
    switch (action.type) {
        case ADD_NEW_DOCUMENT_FILE:
            newUploadFiles.push(action.payload);
            return Object.assign({}, {uploadFiles: newUploadFiles})
        case REMOVE_NEW_DOCUMENT_FILE:
            let removedDoc = newUploadFiles.filter(doc => doc.uid === action.data);
            newUploadFiles.splice(newUploadFiles.indexOf(removedDoc), 1);
            return Object.assign({}, {uploadFiles: newUploadFiles});
        default:
            return state
    }
}

export default addNewDocumentFile;