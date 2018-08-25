import {
  TutorAccountTypes
} from '../constants/index';

const addNewDocumentFile = (state = { uploadFiles: [] }, action) => {
  const newUploadFiles = state.uploadFiles.slice();
  switch (action.type) {
    case TutorAccountTypes.ADD_NEW_DOCUMENT_FILE:
      newUploadFiles.push(action.payload);
      return Object.assign({}, { uploadFiles: newUploadFiles });
    case TutorAccountTypes.REMOVE_NEW_DOCUMENT_FILE:
      return Object.assign({}, { uploadFiles: newUploadFiles.filter(doc => doc.uid !== action.data) });
    default:
      return state;
  }
};

export default addNewDocumentFile;
