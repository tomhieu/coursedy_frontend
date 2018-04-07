import React, {Component} from 'react';
import CourseDetailGeneral from './CourseDetail/CourseDetailGeneral';
import CourseDetailLessons from './CourseDetail/CourseDetailLessons';
import CourseDetailComments from './CourseDetail/CourseDetailComments';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';

import {CommentFormContainer} from '../../containers/index';

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
        {
          this.props.course && this.props.categories.length > 0 ?
            <CourseDetailGeneral 
              categories={this.props.categories}
              course={this.props.course}
              course_category={this.props.course_category}
              course_level={this.props.course_level}
              course_tutor={this.props.course_tutor}
            /> : null
        }
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
          <h3 className={"heading-line " + styles.noMarginBottom}>{this.context.t('course_comments')}</h3>
        </div>
        <CommentFormContainer />
        <div className="clearfix"></div>
        {
          this.props.course_comments.length > 0 ? 
            <CourseDetailComments course_comments={this.props.course_comments}/> :
            <div className="col-md-12">
              <div className="alert alert-info text-center">
                <strong>{this.context.t('course_comments_no_comment')}</strong>
              </div>
            </div>
        }
        {
          this.props.course_comments.length > 0 && 
            this.props.course_comments.length % PUBLIC_COURSE_MAX_NUMBER_COMMENTS_PER_LOAD == 0 ?
          <CoreComponent.CustomButton 
            onClickCallback={this.props.loadMoreCommentsHdl}
            label={"Tải thêm"}
            containerClasses={""}
            btnClasses={"btn-lg"}
          ></CoreComponent.CustomButton> : null
        }
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
