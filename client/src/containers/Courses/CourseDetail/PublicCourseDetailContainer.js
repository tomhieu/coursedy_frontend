import React, { Component } from 'react';
import { CourseDetail } from '../../../components/index';
import * as PublicCourseActions from '../../../actions/PublicCourseActionCreator';
import * as ReferActions from '../../../actions/ReferenceActions/ReferenceDataActionCreator';
import { connect } from 'react-redux';

class PublicCourseDetailContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(ReferActions.fetchCourseCategories())
    if (this.props.courseId) {
      //Fetch course
      this.props.dispatch(PublicCourseActions.fetchPublicCourse(this.props.courseId));

      //Fetch comments

      this.props.dispatch(PublicCourseActions.fetchCourseComments(
        this.props.courseId, 
        this.props.course_comments_page
      ));
    }
  }

  loadMoreComments() {
    this.props.dispatch(PublicCourseActions.fetchCourseComments(
      this.props.courseId, 
      this.props.course_comments_page+1
    ))
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
        course_comments={this.props.course_comments}
        loadMoreCommentsHdl={this.loadMoreComments.bind(this)}
        />
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
  const categories = state.referenceData.courseCategories
  const course = state.PublicCourseDetail.course
  return {
    categories, course,
    course_category: getCourseCategory(categories, course),
    course_level: getCourseLevel(categories, course),
    course_tutor: state.PublicCourseDetail.course_tutor,
    course_sections: state.PublicCourseDetail.course_sections,
    course_comments: state.PublicCourseDetail.course_comments,
    course_comments_page: state.PublicCourseDetail.course_comments_page
  }
}

export default connect(
  mapStateToProps
)(PublicCourseDetailContainer);
