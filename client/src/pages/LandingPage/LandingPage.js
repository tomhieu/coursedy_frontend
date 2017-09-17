import React from 'react';
import cssModules from 'react-css-modules';
import styles from './LandingPage.module.scss';
import { Introduces, CourseGroupList } from '../../components/index';
import { SearchFormContainer } from '../../containers/index';

const LandingPage = (props) => (
  <div>
    <SearchFormContainer/>
    <Introduces/>
    <CourseGroupList/>
  </div>
);

export default cssModules(LandingPage, styles);
