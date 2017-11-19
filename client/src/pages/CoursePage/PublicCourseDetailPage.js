import React from 'react';
import cssModules from 'react-css-modules';

import { PublicCourseDetailContainer } from '../../containers/index';

const PublicCourseDetailPage = (props) => (
  <div className="container">
    <PublicCourseDetailContainer courseId={props.match.params.id}/>
  </div>
);

export default PublicCourseDetailPage;
