import React, { Component } from 'react';
import { CourseDetail } from '../../../components/index';
import * as PublicCourseActions from '../../../actions/PublicCourseActionCreator';
import * as ReferActions from '../../../actions/ReferenceActions/ReferenceDataActionCreator';
import { connect } from 'react-redux';
import * as WebConstants from "constants/WebConstants";

class PublicCourseDetailContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.hideFooter();
    this.props.stretchFull();
    this.props.dispatch(ReferActions.fetchCourseCategories())
    if (this.props.courseId) {
      //Fetch course
      this.props.dispatch(PublicCourseActions.fetchPublicCourse(this.props.courseId));

      //Fetch comments
      this.props.dispatch(PublicCourseActions.fetchCourseComments(
        this.props.courseId, 
        this.props.course_comments_page
      ));

      //Fetch related courses
      this.props.dispatch(PublicCourseActions.fetchRelatedCourses({
        course_id: this.props.courseId,
        page: 1,
        per_page: 4
      }))
    }
  }

  componentWillUnmount() {
    this.props.showFooter();
    this.props.stretchAuto();
  }

  loadMoreComments() {
    this.props.dispatch(PublicCourseActions.fetchCourseComments(
      this.props.courseId, 
      this.props.course_comments_page+1
    ))
  }

  changeActiveMenu(payload) {
    this.props.dispatch(PublicCourseActions.changeActiveMenu(payload))
  }

  render() {
    return (
      <CourseDetail
        {...this.props}
        loadMoreCommentsHdl={this.loadMoreComments.bind(this)}
        changeActiveMenu={this.changeActiveMenu.bind(this)}
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
  const { 
    course, 
    relatedCourses, 
    course_tutor, 
    course_sections,
    course_comments,
    course_comments_page,
    sectionPositions
  } = state.PublicCourseDetail
  return {
    course_category: getCourseCategory(categories, course),
    course_level: getCourseLevel(categories, course),
    categories, course, relatedCourses,
    course_tutor, course_sections,
    course_comments, course_comments_page,
    sectionPositions
  }
}

const mapDispatchToProps = (dispatch) => ({
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
  stretchFull: () => dispatch({ type: WebConstants.STETCH_FULL }),
  stretchAuto: () => dispatch({ type: WebConstants.STETCH_AUTO }),
  dispatch: dispatch
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(PublicCourseDetailContainer);
