import Network from '../utils/network';
import * as asyncActs from 'actions/AsyncActionCreator';
import { dummyTeacherDetail } from '../constants/Teachers';


export const searchTeachers = (query) => {
  return {
    type: asyncActs.FETCH_TEACHERS,
    payload: Network().get('tutors/search', query)
  };
};

export const loadSuggestionsTeacher = (query) => {
  return {
    type: asyncActs.LOAD_SUGGESTION_TEACHERS,
    payload: Network().get('tutors/search', query)
  };
};

export const updateFilterTeacher = (filters) => {
  return {
    type: asyncActs.UPDATE_FILTER_CRITERIA_TEACHERS, data: filters
  };
};

export const fetchTeacherDetail = ({teacherId}) => {
  // TODO change payload to Network().get('tutors/search', query) when teacher detail api complete
  return {
    type: asyncActs.FETCH_TEACHER_DETAIL + asyncActs.FULFILLED,
    payload: dummyTeacherDetail({id: teacherId}),
  }
}

export const fetchTeacherEducations = ({teacherId}) => {
  return {
    type: asyncActs.FETCH_TEACHER_EDUCATIONS,
    payload: Network().get(`tutors/${teacherId}/tutor_educations`)
  };
}

export const fetchTeacherWorkExperiences = ({teacherId}) => {
  return {
    type: asyncActs.FETCH_TEACHER_WORK_EXPERIENCES,
    payload: Network().get(`tutors/${teacherId}/tutor_work_experiences`)
  };
}
