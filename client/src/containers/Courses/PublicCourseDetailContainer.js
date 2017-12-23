import React, { Component } from 'react';
import { CourseDetail } from '../../components/index';
import * as PublicCourseActions from '../../actions/PublicCourseActionCreator';
import * as FilterActions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';

class PublicCourseDetailContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(FilterActions.fetchCategories())
    if (this.props.courseId) {
      this.props.dispatch(PublicCourseActions.fetchPublicCourse(this.props.courseId));
    }
  }

  render() {
    return (
      <CourseDetail
        categories={this.props.categories} 
        course={this.props.course}
        course_category={this.props.course_category}
        course_level={this.props.course_level}
        course_tutor={this.props.course_tutor} 
        course_sections={this.props.course_sections}
        course_comments={this.props.course_comments}/>
    )
  }
}

PublicCourseDetailContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PublicCourseDetailContainer.propTypes = {

};

const getCourseCategory = (categories, course) => {
  if (course && categories && categories.length > 0) {
    return categories.filter(category => {
      return category.id == course.category_id
    })[0]
  }
  return null
}

const getCourseLevel = (categories, course) => {
  let category = getCourseCategory(categories, course)
  if (category) {
    return category.course_levels.filter(level => {
      return level.id == course.course_level_id
    })[0]
  }
  return null
}

const mapStateToProps = (state) => {
  const categories = state.CourseFilter.categories
  const course = state.PublicCourseDetail.course
  return {
    categories: state.CourseFilter.categories,
    course: state.PublicCourseDetail.course, 
    course_category: getCourseCategory(categories, course),
    course_level: getCourseLevel(categories, course),
    course_tutor: state.PublicCourseDetail.course_tutor,
    course_sections: state.PublicCourseDetail.course_sections,
    course_comments: state.PublicCourseDetail.course_comments
  }
}

export default connect(
  mapStateToProps
)(PublicCourseDetailContainer);
