import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LandingPage.module.scss';
import { Introduces } from '../../components/index';
import { SearchFormContainer } from '../../containers/index';
import PopularCourseList from '../../containers/HomePage/PopularCourseListContainer';
import NewCourseList from '../../containers/HomePage/NewCourseListContainer';
import HowToLearn from '../../containers/HomePage/HowToLearnContainer';
import StudentComments from '../../containers/HomePage/StudentCommentsContainer';
import TopTeachers from '../../containers/HomePage/TopTeachersContainer';
import YouAreTeacher from '../../containers/HomePage/YouAreTeacherContainer';
import 'containers/HomePage/Hompage.scss';
import PageContainer from '../../utils/PageContainer';


const LandingPage = props => (
  <PageContainer>
    <SearchFormContainer />
    <Introduces />
    <PopularCourseList />
    <NewCourseList />
    <HowToLearn />
    <StudentComments />
    <TopTeachers />
    <YouAreTeacher />
  </PageContainer>
);

export default cssModules(LandingPage, styles);
