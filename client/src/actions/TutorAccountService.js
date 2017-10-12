import Network from "utils/network";

export const RECEIVE_PERSON_DATA = 'RECEIVE_PERSON_DATA';
export const RECEIVE_EDUCATION_DATA = 'RECEIVE_EDUCATION_DATA';

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

const loadTutorEducationData = () => {
    return {
        type: RECEIVE_EDUCATION_DATA,
        data: tutorEducation
    }
}

const downloadDegree = (degreeId) => {
    return Network().get('/account/tutor/degree/download?degreeId' + degreeId);
}

const deleteDegree = (degreeId) => {
    return Network().delete('/account/tutor/degree/delete?degreeId' + degreeId);
}
