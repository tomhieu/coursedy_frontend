import React, { Component } from 'react';
import CourseDetailGeneral from './CourseDetail/CourseDetailGeneral';
import CourseDetailLessons from './CourseDetail/CourseDetailLessons';
import CourseDetailComments from './CourseDetail/CourseDetailComments';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';

import {CommentFormContainer} from '../../containers/index';
import {Button} from 'react-bootstrap';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let courseDetailGeneral = null;
    if (this.props.course && this.props.categories.length > 0) {
      courseDetailGeneral = <CourseDetailGeneral 
          categories={this.props.categories}
          course={this.props.course}
          course_category={this.props.course_category}
          course_level={this.props.course_level}
          course_tutor={this.props.course_tutor}
        />
    }
    return (
      <div className="course-detail">
        {courseDetailGeneral}
        <div className="clearfix"></div>
        <hr/>
        <CourseDetailLessons course_sections={this.props.course_sections}/>
        {/* Section seperator */}
        <div className="clearfix"></div>
        <div className="col-md-12">
          <hr/>
        </div>

        {/* Course comment block */}
        <div className="col-md-12">
          <h3 className="heading-line">{this.context.t('course_comments')}</h3>
        </div>
        <CommentFormContainer />

        <div className="clearfix"></div>
        <div className="col-md-12">
          <hr/>
        </div>
        <CourseDetailComments course_comments={this.props.course_comments}/>
        <div className="col-md-12">
          <div className="clearfix"></div>
          <div className="text-center">
            <Button type="button" className="btn-primary" onClick={this.props.loadMoreCommentsHdl}>
              Tải thêm
            </Button>
          </div>
        </div>

      </div>
    )
  }
}

CourseDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetail.propTypes = {
};

export default cssModules(CourseDetail, styles);
