import Network from "utils/network";

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
export const UPDATE_TUTOR_EDU = 'UPDATE_TUTOR_EDU';

const personData = {
    firstName: "Trung",
    lastName: "Pham",
    email: "pdbaotrung@gmail.com",
    address: "364A/6 Binh Dong, P15, Quan 8",
    birthDate: "12-04-1992"
}

const tutorEducation = {
    level: {id: 1, label: "Ky Su"},
    degrees: [
        {id: 1, name: "Ky Su Khoa Hoc May Tinh", extension: "pdf"},
        {id: 2, name: "Thac Sy Tieng Anh", extension: "docx"}
    ],
    skills: [
        {id: 1, text:"reading"},
        {id: 2, text:"speaking"}
    ],
    certificates: [
        {id: 1, text: "toiec"},
        {id: 2, text: "ielts"},
        {id: 3, text: "tofle"}
    ]
}

const listDegrees = [
    {id: 1, text: "Trung Hoc Pho Thong"},
    {id: 2, text: "Trung Cap"},
    {id: 3, text: "Cao Dang"},
    {id: 4, text: "Dai Hoc"},
    {id: 5, text: "Thac Sy"},
    {id: 6, text: "Tien Sy"}
]

const listSkills = [
    {id: 1, text: "Reading"},
    {id: 2, text: "Speaking"},
    {id: 3, text: "Listening"},
    {id: 4, text: "Writting"},
    {id: 5, text: "Thuyet Trinh"},
    {id: 6, text: "Giao Tiep"},
    {id: 7, text: "Phan Bien"}
]

const listCertificates = [
    {id: 1, text: "TOIEC"},
    {id: 2, text: "IELTS"},
    {id: 3, text: "TESOL"},
    {id: 4, text: "TOFEL"},
    {id: 5, text: "AVAT"},
    {id: 6, text: "TTOV"}
]

export const loadPersonInfo = () => {
/*    return dispatch => {
        Network().get('/account/personal').then((response) => dispatch(receiveInfo(response.json())));
    }
    */
    return receiveInfo(personData);
}

export const savePersonData = (firstName, lastName, email, birthDate, address) => {
    debugger
    return {
        type: SAVE_PERSON_DATA,
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthDate: birthDate,
            address: add
        }
    }
}

const receiveInfo = data => {
    return {
        type: RECEIVE_PERSON_DATA,
        data: data
    }
}

export const loadTutorEducationData = () => {
    return {
        type: RECEIVE_EDUCATION_DATA,
        data: tutorEducation
    }
}

export const loadListDegreesData = () => {
    return {
        type: RECEIVE_DRGREES_DATA,
        data: listDegrees
    }
}

export const loadListSkillData = () => {
    return {
        type: RECEIVE_SKILLS_DATA,
        data: listSkills
    }
}

export const loadListCertificatesData = () => {
    return {
        type: RECEIVE_CERTIFICATES_DATA,
        data: listCertificates
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
        Network().post('/account/tutor/change/password', data).then((response)=> {
            dispatch({
                type: COMPLETE_UPDATE_PASSWORD
            })
        });
    }
}


export const updateTutorEducation = (data) => {
    dispatch => {
        Network().post('/account/tutor/update/edu', data).then((response)=> {
            dispatch({
                type: UPDATE_TUTOR_EDU,
                payload: data
            })
        });
    }
}
