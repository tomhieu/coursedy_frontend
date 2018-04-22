import React from 'react';

import {CourseFilterContainer, PublicCourseListContainer} from '../../containers/index';

const PublicCourseListPage = (props) => (
  <div className="d-flex flex-auto flex-vertical">
      <div className="d-flex flex-auto course-filter-container">
          <CourseFilterContainer />
      </div>
      <div className="d-flex flex-stretch">
          <PublicCourseListContainer />
      </div>
  </div>
);

export default PublicCourseListPage;
