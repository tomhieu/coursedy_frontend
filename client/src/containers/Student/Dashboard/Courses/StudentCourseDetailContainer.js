import React, {Component} from 'react';
import {connect} from 'react-redux';
import StudentCourseDetail from '../../../../components/Student/Course/StudentCourseDetail';
import * as ReferActions from '../../../../actions/ReferenceActions/ReferenceDataActionCreator';
import * as PublicCourseActions from '../../../../actions/PublicCourseActionCreator';
import * as sessionActions from '../../../../actions/SessionActionCreator';
import {openConfirmationPopup} from '../../../../actions/MainActionCreator';

class StudentCourseDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCourseCategories();
    const { courseId } = this.props;
    if (courseId) {
      // Fetch course
      this.props.getPublicCourse(courseId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      this.props.getCourseCategories();
      const { courseId } = nextProps;
      if (courseId) {
        // Fetch course
        this.props.getPublicCourse(courseId);

        // Fetch related courses
        this.props.getRelatedCourses(courseId, WebConstants.START_PAGE_INDEX, WebConstants.RELATED_COURSE_PER_PAGE);
      }
    }
  }

  render() {
    return (
      <StudentCourseDetail
        {...this.props}
      />
    );
  }
}

StudentCourseDetailContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

StudentCourseDetailContainer.propTypes = {

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
  getCourseCategories: () => dispatch(ReferActions.fetchCourseCategories()),
  getPublicCourse: courseId => dispatch(PublicCourseActions.fetchPublicCourse(courseId)),
  enrollCourse: (courseId) => dispatch(PublicCourseActions.submitEnrollCourse(courseId)),
  addCourseToCart: (course) => dispatch(PublicCourseActions.addCourseToCart(course)),
  changeActiveMenu: (payload) => dispatch(PublicCourseActions.changeActiveMenu(payload)),
  showWarningPopup: (title, message, callback) => dispatch(openConfirmationPopup(title, message, callback)),
  fetchEnrolledCourseList: user => dispatch(sessionActions.fetchActiveCourses(user))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(StudentCourseDetailContainer);
