import React from 'react';

import { CourseFilterContainer, PublicCourseListContainer } from '../../containers/index';

const PublicCourseListPage = props => (
  <div className="d-flex flex-auto flex-vertical full-width-in-container">
    <div className="d-flex flex-auto course-filter-container">
      <CourseFilterContainer />
    </div>
    <div className="public-course-list-container d-flex flex-stretch">
      <div className="container">
        <PublicCourseListContainer />
      </div>
    </div>
  </div>
);

export default PublicCourseListPage;
