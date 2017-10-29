import React from 'react';
import cssModules from 'react-css-modules';
import styles from './CoursePage.module.scss';

import { PublicCourseDetailContainer } from '../../containers/index';

const PublicCourseDetailPage = (props) => (
  <div className="container">
    <PublicCourseDetailContainer id={props.match.params.id}/>
  </div>
);

export default cssModules(PublicCourseDetailPage, styles);
