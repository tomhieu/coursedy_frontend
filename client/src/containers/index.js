import LoginFormContainer from './Auth/LoginFormContainer';
import RegisterFormContainer from './Auth/RegisterFormContainer';
import SearchFormContainer from './SearchForm/SearchFormContainer';
import PersonInfoContainer from './Account/PersonInfoContainer';

import PublicCourseListContainer from './Courses/CourseList/PublicCourseListContainer';
import PublicCourseListFollowModalContainer from './Courses/Follow/PublicCourseListFollowModalContainer';

import PublicCourseDetailContainer from './Courses/CourseDetail/PublicCourseDetailContainer';
import PublicCourseDetailFollowModalContainer from './Courses/Follow/PublicCourseDetailFollowModalContainer';
import PublicCourseDetailEnrollContainer from './Courses/Enroll/PublicCourseDetailEnrollContainer';
import CourseFilterContainer from './Courses/Filter/CourseFilterContainer';
import RoleAuthorization from '../components/RoleAuthorization';

import CommentFormContainer from './Courses/CourseDetail/CommentFormContainer';
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
  PublicCourseListFollowModalContainer,
  
  PublicCourseDetailContainer,
  PublicCourseDetailFollowModalContainer,
  PublicCourseDetailEnrollContainer,

  CourseFilterContainer,
  CommentFormContainer,
  
  AccountContainers,
  StudentContainers,
  TutorContainers
}
