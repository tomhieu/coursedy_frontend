import Header from '../containers/Main/Header/Header';
import Footer from '../containers/Main/Footer/Footer';
import Layout from './Layout/Layout';
import * as CoreComponent from './Core';
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegisterForm';
import SearchForm from './SearchForm/SearchForm';
import Introduces from './Introduces/Introduces';
import CourseGroup from './Course/CourseGroup/CourseGroup';
import CourseGroupList from './Course/CourseGroupList/CourseGroupList';
import CourseDetail from './Courses/CourseDetail';
import CourseFilter from './Courses/BaseFilter';
import CourseItem from './Courses/CourseItem/CourseItem';
import CourseList from './Courses/CourseList';
import TutorSearchForm from './Tutor/TutorSearchForm/TutorSearchForm';
import TutorItem from './Tutor/TutorItem/TutorItem';
import TutorList from './Tutor/TutorList/TutorList';
import TutorProfileDetails from './Tutor/Profile/TutorProfileDetails';

import * as StudentComponents from './Student';
import * as AdminComponents from './Admin';

import RoleAuthorization from './RoleAuthorization';
import LoadingMask from './LoadingMask/LoadingMask';
import TutorDashboardMenu from './Dashboard/TutorDashboard/TutorDashboardMenu';
import CourseForm from './Courses/CourseForm/CourseForm';
import UserInfo from './Account/UserInfo';
import RequireEmailConfirmationModal from './Account/RequireEmailConfirmationModal';
import TutorDetail from './Dashboard/Tutors/TutorDetail';

import * as PaymentComponents from './Payment';
import StatisticCard from './Dashboard/StatisticCard.js';

export {
  Header,
  Footer,
  Layout,
  CoreComponent,
  LoginForm,
  RegisterForm,
  SearchForm,
  Introduces,
  CourseGroup,
  CourseGroupList,
  CourseList,
  CourseItem,
  CourseDetail,
  CourseFilter,
  TutorSearchForm,
  TutorItem,
  TutorList,
  RoleAuthorization,
  LoadingMask,
  TutorDashboardMenu,
  TutorDetail,

  AdminComponents,
  StudentComponents,
  PaymentComponents,
  StatisticCard,

  CourseForm,
  TutorProfileDetails,
  UserInfo,
  RequireEmailConfirmationModal
};
