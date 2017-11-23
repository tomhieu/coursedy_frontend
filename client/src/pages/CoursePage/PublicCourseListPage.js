import React from 'react';
import cssModules from 'react-css-modules';

import { CourseFilterContainer } from '../../containers/index';
import { PublicCourseListContainer } from '../../containers/index';

const PublicCourseListPage = (props) => (
  <div className="row">
      <div className="col-md-12 col-sm-12">
          <CourseFilterContainer />
      </div>
      <div className="clearfix"></div>
      <div className="col-md-12 col-sm-12">
          <PublicCourseListContainer />
      </div>
  </div>
);

export default PublicCourseListPage;
