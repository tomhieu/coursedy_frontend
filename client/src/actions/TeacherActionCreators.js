import * as asyncActs from 'actions/AsyncActionCreator';
import Network from '../utils/network';
import { dummyTeacherDetail } from '../constants/Teachers';


export const searchTeachers = (query) => {
  return {
    type: asyncActs.FETCH_TEACHERS,
    payload: Network().get('tutors/search', query),
    meta: 'publicTeacherListPlaceholder'
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

export const fetchTeacherDetail = ({ teacherSlug, meta }) => {
  console.log("DEBUG fetchTeacherDetail 2");
  console.log(teacherSlug);
  return {
    type: asyncActs.FETCH_TEACHER_DETAIL,
    payload: Network().get(`tutors/${teacherSlug}`),
    meta,
  };
};

export const fetchTeacherEducations = ({ teacherId, meta }) => {
  return {
    type: asyncActs.FETCH_TEACHER_EDUCATIONS,
    payload: Network().get(`tutors/${teacherId}/tutor_educations`),
    meta,
  };
};

export const fetchTeacherWorkExperiences = ({ teacherId, meta }) => {
  return {
    type: asyncActs.FETCH_TEACHER_WORK_EXPERIENCES,
    payload: Network().get(`tutors/${teacherId}/tutor_work_experiences`),
    meta,
  };
};

export const fetchTeacherReviews = ({ teacherId, meta, query }) => {
  return {
    type: asyncActs.FETCH_TEACHER_REVIEWS,
    payload: Network().get(`tutors/${teacherId}/tutor_reviews`, query),
    meta,
  };
};

export const fetchTeacherCourses = ({ teacherId, meta, query }) => {
  return {
    type: asyncActs.FETCH_TEACHER_COURSES,
    payload: Network().get(`tutors/${teacherId}/courses`, query),
    meta,
  };
};

export const submitTeacherComment = ({ content, teacherId, userId }) => {
  const params = {
    content,
    user_id: userId
  };

  return {
    type: asyncActs.TEACHER_DETAIL_SUBMIT_COMMENT,
    payload: Network().post(`tutors/${teacherId}/tutor_reviews`, params),
    meta: "reviewTeacherPlaceholder"
  };
};
