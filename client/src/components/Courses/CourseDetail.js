import React, {Component} from 'react';
import CourseDetailHeader from './CourseDetail/CourseDetailHeader';
import CourseDetailMain from './CourseDetail/CourseDetailMain';

import CourseDetailGeneral from './CourseDetail/CourseDetailGeneral';
import CourseDetailLessons from './CourseDetail/CourseDetailLessons';
import CourseDetailComments from './CourseDetail/CourseDetailComments';
import cssModules from 'react-css-modules';
import './CourseDetail.scss';

import {CoreComponent} from '../index';
import {PUBLIC_COURSE_MAX_NUMBER_COMMENTS_PER_LOAD} from '../../constants/Courses';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="course-detail">
        <div className="course-detail-header full-width-in-container">
          <div className="container">
            <CourseDetailHeader {...this.props}/>
          </div>
        </div>
        <CourseDetailMain {...this.props}/>
      </div>
    )
  }
}

CourseDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetail.propTypes = {
};

export default CourseDetail;
