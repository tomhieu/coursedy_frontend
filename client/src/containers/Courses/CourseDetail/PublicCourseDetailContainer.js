import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as WebConstants from 'constants/WebConstants';
import {CourseDetail} from '../../../components/index';
import * as PublicCourseActions from '../../../actions/PublicCourseActionCreator';
import * as ReferActions from '../../../actions/ReferenceActions/ReferenceDataActionCreator';
import {openConfirmationPopup} from '../../../actions/MainActionCreator';
import PageContainer from '../../../utils/PageContainer';
import * as sessionActions from "../../../actions/SessionActionCreator";
import {
  COUSES_ENROLL_ERROR_NOT_ENOUGH_BALANCE
} from "../../../constants/WebConstants.js";
import {globalHistory} from 'utils/globalHistory';

class PublicCourseDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.hideFooter();
    this.props.stretchFull();
    this.props.noShadowHeader();
    this.props.getCourseCategories();
    if (this.props.courseSlug) {
      // Fetch course
      this.props.getPublicCourse(this.props.courseSlug);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      this.props.getCourseCategories();
      const { courseSlug } = nextProps;
      if (courseSlug) {
        // Fetch course
        this.props.getPublicCourse(courseSlug);

        // Fetch related courses
        this.props.getRelatedCourses(this.props.course.id, WebConstants.START_PAGE_INDEX, WebConstants.RELATED_COURSE_PER_PAGE);
      }
    }

    if (this.props.course.id === undefined && nextProps.course.id !== undefined) {
      // Fetch comments
      this.props.getCourseComments(nextProps.course.id, this.props.course_comments_page);

      // Fetch related courses
      this.props.getRelatedCourses(nextProps.course.id, WebConstants.START_PAGE_INDEX, WebConstants.RELATED_COURSE_PER_PAGE);
    }
  }

  componentWillUnmount() {
    this.props.showFooter();
    this.props.stretchAuto();
    this.props.shadowHeader();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.submit_enroll_errors.length !== 0) {
  //     //Redirect to payment page if not enough balance
  //     if (nextProps.submit_enroll_errors.indexOf(COUSES_ENROLL_ERROR_NOT_ENOUGH_BALANCE)) {
  //       globalHistory.push('/payment');
  //       console.log('DEBUG Submit Enroll Fail')
  //     }
  //   }
  // }

  loadMoreComments() {
    this.props.getCourseComments(this.props.course.id, this.props.course_comments_page + 1);
  }

  changeActiveMenu(payload) {
    this.props.changeActiveMenu(payload);
  }

  render() {
    const {isFetchingCourseDetails} = this.props;
    if (isFetchingCourseDetails) {
      return null;
    }
    return (
      <PageContainer
        error={this.props.course.error}
        meta={{ title: this.context.t('course_detail_page', { title: this.props.course.title || '' }) }}
      >
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
      return level.id === course.course_level_id;
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
    sectionPositions,
    isFetchingCourseDetails,
    submit_enroll_errors
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
    isEnrolled,
    isFetchingCourseDetails,
    submit_enroll_errors
  };
}

const mapDispatchToProps = dispatch => ({
  showFooter: () => dispatch({ type: WebConstants.SHOW_FOOTER }),
  hideFooter: () => dispatch({ type: WebConstants.HIDE_FOOTER }),
  stretchFull: () => dispatch({ type: WebConstants.STETCH_FULL }),
  stretchAuto: () => dispatch({ type: WebConstants.STETCH_AUTO }),
  noShadowHeader: () => dispatch({ type: WebConstants.ADD_HEADER_CLASS, payload: 'no-shadow' }),
  shadowHeader: () => dispatch({ type: WebConstants.REMOVE_HEADER_CLASS }),
  getCourseCategories: () => dispatch(ReferActions.fetchCourseCategories()),
  getPublicCourse: courseSlug => dispatch(PublicCourseActions.fetchPublicCourse(courseSlug)),
  getCourseComments: (courseId, page) => dispatch(PublicCourseActions.fetchCourseComments(courseId, page)),
  getRelatedCourses: (courseId, page, perPage) => dispatch(PublicCourseActions.fetchRelatedCourses({course_id: courseId, page, perPage})),
  enrollCourse: (courseId) => dispatch(PublicCourseActions.submitEnrollCourse(courseId)),
  addCourseToCart: (course) => dispatch(PublicCourseActions.addCourseToCart(course)),
  changeActiveMenu: (payload) => dispatch(PublicCourseActions.changeActiveMenu(payload)),
  showWarningPopup: (title, message, callback) => dispatch(openConfirmationPopup(title, message, callback)),
  fetchEnrolledCourseList: user => dispatch(sessionActions.fetchActiveCourses(user))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(PublicCourseDetailContainer);
