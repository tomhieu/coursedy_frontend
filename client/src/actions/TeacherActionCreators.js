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

export const fetchTeacherDetail = ({teacherId, meta}) => {
  return {
    type: asyncActs.FETCH_TEACHER_DETAIL,
    payload:  Network().get(`tutors/${teacherId}`),
    meta,
  }
}

export const fetchTeacherEducations = ({teacherId, meta}) => {
  return {
    type: asyncActs.FETCH_TEACHER_EDUCATIONS,
    payload: Network().get(`tutors/${teacherId}/tutor_educations`),
    meta,
  };
}

export const fetchTeacherWorkExperiences = ({teacherId, meta}) => {
  return {
    type: asyncActs.FETCH_TEACHER_WORK_EXPERIENCES,
    payload: Network().get(`tutors/${teacherId}/tutor_work_experiences`),
    meta,
  };
}

export const fetchTeacherReviews = ({teacherId, meta, query}) => {
  return {
    type: asyncActs.FETCH_TEACHER_REVIEWS,
    payload: Network().get(`tutors/${teacherId}/tutor_reviews`, query),
    meta,
  };
}

export const fetchTeacherCourses = ({teacherId, meta, query}) => {
  return {
    type: asyncActs.FETCH_TEACHER_COURSES,
    payload: Network().get(`users/${teacherId}/courses`, query),
    meta,
  };
}