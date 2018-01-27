import React from 'react';

import {CourseFilterContainer, PublicCourseListContainer} from '../../containers/index';

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
