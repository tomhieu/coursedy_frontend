import React from 'react';
import cssModules from 'react-css-modules';
import styles from './CoursePage.module.scss';
import { CourseFilter, CourseGroupList2 } from '../../components'

const CourseListPage = (props) => (
  <div className="container">
  <CourseFilter />
  <div className="clearfix"></div>
  <CourseGroupList2 
    list={[
      {
        id: 1234,
        name: 'Course 1',
        thumb: 'http://placehold.it/200x100',
        duration: 20,
        schedule: '8h30 - 9h30',
        no_comments: 15,
        tutor: {
          id: 1234,
          name: 'Berit Jaleiah',
          avatar: 'https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png'
        }
      },
      {
        id: 1235,
        name: 'Course 2',
        thumb: 'http://placehold.it/200x100',
        duration: 20,
        schedule: '8h30 - 9h30',
        no_comments: 15,
        tutor: {
          id: 1234,
          name: 'Berit Jaleiah',
          avatar: 'https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png'
        }
      },
    ]} 
  />
  </div>
);

export default cssModules(CourseListPage, styles);
