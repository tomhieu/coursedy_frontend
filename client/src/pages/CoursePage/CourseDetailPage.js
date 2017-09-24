import React from 'react';
import cssModules from 'react-css-modules';
import styles from './CoursePage.module.scss';
import { CourseDetail } from '../../components'


const CourseDetailPage = (props) => (
  <div className="container">
    <CourseDetail />
  </div>
)

export default cssModules(CourseDetailPage, styles);