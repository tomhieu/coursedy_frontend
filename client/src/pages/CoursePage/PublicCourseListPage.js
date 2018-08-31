import React from 'react';

import { CourseFilterContainer, PublicCourseListContainer } from '../../containers/index';
import PageContainer from '../../utils/PageContainer';

class PublicCourseListPage extends React.Component {
  render() {
    return (
      <PageContainer
        meta={{ title: this.context.t('public_course_list_page') }}
      >
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
  }
}

PublicCourseListPage.contextTypes = {
  t: React.PropTypes.func.isRequired
}
export default PublicCourseListPage;
