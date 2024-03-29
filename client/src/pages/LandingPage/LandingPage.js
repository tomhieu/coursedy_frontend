import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LandingPage.module.scss';
import { Introduces } from '../../components/index';
import { SearchFormContainer } from '../../containers/index';
import PopularCourseList from '../../containers/HomePage/PopularCourseListContainer';
import NewCourseList from '../../containers/HomePage/NewCourseListContainer';
import HowToLearn from '../../containers/HomePage/HowToLearnContainer';
import TopTeachers from '../../containers/HomePage/TopTeachersContainer';
import YouAreTeacher from '../../containers/HomePage/YouAreTeacherContainer';
import 'containers/HomePage/Hompage.scss';


const LandingPage = props => (
  <div>
    <SearchFormContainer />
    <Introduces />
    <PopularCourseList />
    <NewCourseList />
    <HowToLearn />
    <TopTeachers />
    <YouAreTeacher />
  </div>
);

export default cssModules(LandingPage, styles);
