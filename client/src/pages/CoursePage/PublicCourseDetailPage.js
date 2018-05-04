import React from 'react';
import cssModules from 'react-css-modules';

import { PublicCourseDetailContainer } from '../../containers/index';

const PublicCourseDetailPage = (props) => (
  <PublicCourseDetailContainer courseId={props.match.params.id}/>
);

export default PublicCourseDetailPage;
