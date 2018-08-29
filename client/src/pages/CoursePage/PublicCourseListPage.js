import React from 'react';

import { CourseFilterContainer, PublicCourseListContainer } from '../../containers/index';
import PageContainer from '../../utils/PageContainer';

const PublicCourseListPage = props => (
  <PageContainer>
    <div className="d-flex flex-auto flex-vertical">
      <div className="d-flex flex-auto course-filter-container">
        <CourseFilterContainer />
      </div>
      <div className="public-course-list-container d-flex flex-stretch">
        <div className="container">
          <PublicCourseListContainer />
        </div>
      </div>
    </div>
  </PageContainer>
);

export default PublicCourseListPage;
