import React from 'react';
import cssModules from 'react-css-modules';
import styles from './CoursePage.module.scss';

import { CourseFilter } from '../../components/index';
import { PublicCourseListContainer } from '../../containers/index';

const PublicCourseListPage = (props) => (
  <div className="container">
    <CourseFilter />
    <div className="clearfix"></div>
    <PublicCourseListContainer />
  </div>
);

export default cssModules(PublicCourseListPage, styles);
