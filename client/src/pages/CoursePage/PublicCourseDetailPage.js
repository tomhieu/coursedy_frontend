import React from 'react';

import { PublicCourseDetailContainer } from '../../containers/index';

const PublicCourseDetailPage = props => (
  <PublicCourseDetailContainer courseSlug={props.match.params.slug} />
);

export default PublicCourseDetailPage;
