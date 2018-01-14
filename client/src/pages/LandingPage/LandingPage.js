import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LandingPage.module.scss';
import { Introduces, CourseGroupList } from '../../components/index';
import { SearchFormContainer } from '../../containers/index';
import NewCourseList from '../../containers/HomePage/NewCourseListContainer';
import HowToLearn from '../../containers/HomePage/HowToLearnContainer';
import StudentComments from '../../containers/HomePage/StudentCommentsContainer';
import TopTeachers from '../../containers/HomePage/TopTeachersContainer';
import YouAreTeacher from '../../containers/HomePage/YouAreTeacherContainer';
import 'containers/HomePage/Hompage.scss'


const LandingPage = (props) => (
  <div>
    <SearchFormContainer/>
    <Introduces/>
    <CourseGroupList/>
    <NewCourseList />
    <HowToLearn />
    <StudentComments />
    <TopTeachers />
    <YouAreTeacher />
  </div>
);

export default cssModules(LandingPage, styles);
