import React from 'react';
import cssModules from 'react-css-modules';

import { CourseFilterContainer } from '../../containers/index';
import { PublicCourseListContainer } from '../../containers/index';

const PublicCourseListPage = (props) => (
  <div className="container">
    <CourseFilterContainer />
    <div className="clearfix"></div>
    <PublicCourseListContainer />
  </div>
);

export default PublicCourseListPage;
