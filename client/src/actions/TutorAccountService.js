import Network from "utils/network";

export const RECEIVE_PERSON_DATA = 'RECEIVE_PERSON_DATA';
export const RECEIVE_EDUCATION_DATA = 'RECEIVE_EDUCATION_DATA';
export const RECEIVE_DRGREES_DATA = 'RECEIVE_DEGREES_DATA';

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
        {id: 1, name: "Ky Su Khoa Hoc May Tinh"},
        {id: 2, name: "Thac Sy Tieng Anh"}
    ],
    skills: [
        "reading", "speaking"
    ],
    certificates: ["toiec", "ielts", "tofle"]
}

const listDegrees = [
    {id: 1, name: "Trung Hoc Pho Thong"},
    {id: 2, name: "Trung Cap"},
    {id: 3, name: "Cao Dang"},
    {id: 4, name: "Dai Hoc"},
    {id: 5, name: "Thac Sy"},
    {id: 6, name: "Tien Sy"}
]

export const loadPersonInfo = () => {
/*    return dispatch => {
        Network().get('/account/personal').then((response) => dispatch(receiveInfo(response.json())));
    }
    */
    return receiveInfo(personData);
}

export const savePersonData = (person) => {
    return Network().post('account/save', person).then(response => console.log(response));
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

export const downloadDegree = (degreeId) => {
    return "";
//    return Network().get('/account/tutor/degree/download?degreeId' + degreeId);
}

export const deleteDegree = (degreeId) => {
    return "";
//    return Network().delete('/account/tutor/degree/delete?degreeId' + degreeId);
}
