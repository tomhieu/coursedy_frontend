import React, {Component} from 'react';
import './StudentCourseDetail.scss';
import {globalHistory} from '../../../utils/globalHistory';
import StudentCourseDetailAction from './StudentCourseDetailAction';
import StudentCourseContent from './StudentCourseContent';
import CourseDetailHeader from '../../Courses/CourseDetail/CourseDetailHeader';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class StudentCourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFixedSidebar: false,
      currentScrollPosition: 0,
      activeMenu: 'course-detail-intro',
      showEnrollPopup: false,
      showEnrollSuccessPopup: false
    };
  }

  enrollToCourse(courseId, user) {
    const res = this.props.enrollCourse(courseId);
    res.then(() => {
      this.props.fetchEnrolledCourseList(user);
      this.closeEnrollPopup();
      this.setState({ showEnrollSuccessPopup: true });
    }, (error) => {
      globalHistory.push('payment');
    });
  }

  openEnrollPopup() {
    this.setState({ showEnrollPopup: true });
  }

  closeEnrollPopup() {
    this.setState({ showEnrollPopup: false });
  }

  closeEnrollSuccessPopup() {
    this.setState({ showEnrollSuccessPopup: false });
  }

  render() {
    const { activeMenu, currentScrollPosition } = this.state;
    const { course, course_sections, user } = this.props;
    return (
      <div className="d-flex flex-auto flex-vertical public-course-details">
        <CourseDetailHeader
          {...this.props} forStudentView={true}
        />
        <div className="d-flex flex-auto">
          <div className="d-flex flex-auto course-details-wrapper container">
            <div className="d-flex flex-auto course-content">
              <StudentCourseContent
                {...this.props}
                activeMenu={activeMenu}
                currentScrollPosition={currentScrollPosition}
              />
            </div>
            <div className="student-course-action-view">
              <StudentCourseDetailAction
                course={course}
                course_sections={course_sections}
                openEnrollCoursePopup={this.openEnrollPopup.bind(this)}
                {...this.props}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentCourseDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
};

StudentCourseDetail.propTypes = {
  enrollCourse: React.PropTypes.func.isRequired,
  fetchEnrolledCourseList: React.PropTypes.func.isRequired,
  isEnrolled: React.PropTypes.bool.isRequired
};

export default StudentCourseDetail;
