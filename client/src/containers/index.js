import LoginFormContainer from './Auth/LoginFormContainer';
import RegisterFormContainer from './Auth/RegisterFormContainer';
import SearchFormContainer from './SearchForm/SearchFormContainer';
import PersonInfoContainer from './Account/PersonInfoContainer';

import PublicCourseListContainer from './Courses/CourseList/PublicCourseListContainer';

import PublicCourseDetailContainer from './Courses/CourseDetail/PublicCourseDetailContainer';
import CourseDetailFollowContainer from './Courses/Follow/CourseDetailFollowContainer';
import CourseDetailEnrollContainer from './Courses/Enroll/CourseDetailEnrollContainer';
import CourseFilterContainer from './Courses/Filter/CourseFilterContainer';
import RoleAuthorization from '../components/RoleAuthorization';

import CommentFormContainer from './Courses/CourseDetail/CommentFormContainer';

import * as AdminContainers from './Admin/'
import * as AccountContainers from './Account'
import * as StudentContainers from './Student'
import * as TutorContainers from './Tutor'

export {
  LoginFormContainer,
  RegisterFormContainer,
  SearchFormContainer,
  PersonInfoContainer,
  //Front-end
  PublicCourseListContainer,
  
  PublicCourseDetailContainer,
  CourseDetailFollowContainer,
  CourseDetailEnrollContainer,

  CourseFilterContainer,
  CommentFormContainer,
  
  AdminContainers,
  AccountContainers,
  StudentContainers,
  TutorContainers
}
