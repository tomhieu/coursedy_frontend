import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as WebConstants from 'constants/WebConstants';
import { CourseDetail } from '../../../components/index';
import * as PublicCourseActions from '../../../actions/PublicCourseActionCreator';
import * as ReferActions from '../../../actions/ReferenceActions/ReferenceDataActionCreator';
import { openConfirmationPopup } from '../../../actions/MainActionCreator';
import { TT } from '../../../utils/locale';
import PageContainer from '../../../utils/PageContainer';
import * as sessionActions from '../../../actions/SessionActionCreator';

class PublicCourseDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.hideFooter();
    this.props.stretchFull();
    this.props.noShadowHeader();
    this.props.getCourseCategories();
    const { courseId, course_comments_page } = this.props;
    if (courseId) {
      // Fetch course
      this.props.getPublicCourse(courseId);

      // Fetch comments
      this.props.getCourseComments(courseId, course_comments_page);

      // Fetch related courses
      this.props.getRelatedCourses(courseId, WebConstants.START_PAGE_INDEX, WebConstants.RELATED_COURSE_PER_PAGE);
    }
  }

  componentWillUnmount() {
    this.props.showFooter();
    this.props.stretchAuto();
    this.props.shadowHeader();
  }

  loadMoreComments() {
    this.props.getCourseComments(this.props.courseId, this.props.course_comments_page + 1);
  }

  changeActiveMenu(payload) {
    this.props.changeActiveMenu(payload);
  }

  render() {
    return (
      <PageContainer error={this.props.course.error}>
        <CourseDetail
          {...this.props}
          loadMoreCommentsHdl={this.loadMoreComments.bind(this)}
          changeActiveMenu={this.changeActiveMenu.bind(this)}
        />
      </PageContainer>
    );
  }
}

PublicCourseDetailContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

PublicCourseDetailContainer.propTypes = {

};

const getCourseCategory = (categories, course) => {
  if (course && categories && categories.length > 0) {
    return categories.filter((category) => {
      return category.id == course.category_id;
    })[0];
  }
  return null;
};

const getCourseLevel = (categories, course) => {
  const category = getCourseCategory(categories, course);
  if (category) {
    return category.course_levels.filter((level) => {
      return level.id == course.course_level_id;
    })[0];
  }
  return null;
};

const getCourse = (course, courseSections) => {
  course = { ...course };
  let totalPeriod = 0;
  courseSections.forEach((section) => {
    section.lessons.forEach((lesson) => {
      totalPeriod += lesson.period;
    });
  });
  course.totalPeriod = totalPeriod;
  return course;
};

const mapStateToProps = (state) => {
  const categories = state.referenceData.courseCategories;
  const {
    course,
    relatedCourses,
    course_tutor,
    course_sections,
    course_comments,
    course_comments_page,
    sectionPositions
  } = state.PublicCourseDetail;
  const { newStartedCourses } = state.session;
  const isEnrolled = newStartedCourses.findIndex(c => c.id === course.id) >= 0;
  return {
    course_category: getCourseCategory(categories, course),
    course_level: getCourseLevel(categories, course),
    user: state.session.currentUser,
    categories,
    course: getCourse(course, course_sections),
    relatedCourses,
    course_tutor,
    course_sections,
    course_comments,
    course_comments_page,
    sectionPositions,
    isEnrolled
  };
};

const mapDispatchToProps = dispatch => ({
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
  stretchFull: () => dispatch({ type: WebConstants.STETCH_FULL }),
  stretchAuto: () => dispatch({ type: WebConstants.STETCH_AUTO }),
  noShadowHeader: () => dispatch({ type: WebConstants.ADD_HEADER_CLASS, payload: 'no-shadow' }),
  shadowHeader: () => dispatch({ type: WebConstants.REMOVE_HEADER_CLASS }),
  getCourseCategories: () => dispatch(ReferActions.fetchCourseCategories()),
  getPublicCourse: courseId => dispatch(PublicCourseActions.fetchPublicCourse(courseId)),
  getCourseComments: (courseId, page) => dispatch(PublicCourseActions.fetchCourseComments(courseId, page)),
  getRelatedCourses: (courseId, page, perPage) => dispatch(PublicCourseActions.fetchRelatedCourses({ courseId, page, perPage })),
  enrollCourse: courseId => dispatch(PublicCourseActions.submitEnrollCourse(courseId)),
  changeActiveMenu: payload => dispatch(PublicCourseActions.changeActiveMenu(payload)),
  showWarningPopup: (title, message, callback) => dispatch(openConfirmationPopup(title, message, callback)),
  fetchEnrolledCourseList: user => dispatch(sessionActions.fetchActiveCourses(user))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(PublicCourseDetailContainer);
