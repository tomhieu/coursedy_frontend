import React, {Component} from 'react';
import CourseDetailHeader from './CourseDetail/CourseDetailHeader';
import CourseDetailMain from './CourseDetail/CourseDetailMain';
import './CourseDetail.scss';
import {PUBLIC_COURSE_MAX_NUMBER_COMMENTS_PER_LOAD} from '../../constants/Courses';
import CourseDetailAction from "./CourseDetail/CourseDetailAction";
import EnrollCoursePopup from "./EnrollPopup/EnrollCoursePopup";
import EnrollCourseSuccessPopup from "./EnrollPopup/EnrollCourseSuccessPopup";
import {globalHistory} from "../../utils/globalHistory";

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayFixedSidebar: false,
      currentScrollPosition: 0,
      activeMenu: 'course-detail-intro',
      showEnrollPopup: false,
      showEnrollSuccessPopup: false
    }
    this.onScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.scrollTo(0,0)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  handleScroll(event) {
    const triggerPosition = 200;
    const top = window.pageYOffset || document.documentElement.scrollTop
    if (triggerPosition < top) {
      this.courseActionBar.classList.add('fixed-action-bar')
    } else {
      this.courseActionBar.classList.remove('fixed-action-bar')
    }
  }

  enrollToCourse(courseId, user) {
    const res = this.props.enrollCourse(courseId);
    res.then(() => {
      this.props.fetchEnrolledCourseList(user);
      this.closeEnrollPopup();
      this.setState({showEnrollSuccessPopup: true})
    }, (error) => {
      globalHistory.push('payment');
    })
  }

  openEnrollPopup() {
    this.setState({showEnrollPopup: true})
  }

  closeEnrollPopup() {
    this.setState({showEnrollPopup: false});
  }

  closeEnrollSuccessPopup() {
    this.setState({showEnrollSuccessPopup: false});
  }

  render() {
    const { activeMenu, currentScrollPosition } = this.state;
    const {course, course_sections, user} = this.props;
    return (
      <div className="d-flex flex-auto flex-vertical full-width-in-container">
        <CourseDetailHeader
          {...this.props}
        />
        <div className="row">
          <div className="col-md-8">
            <CourseDetailMain
              {...this.props}
              activeMenu={activeMenu}
              currentScrollPosition={currentScrollPosition}
            />
          </div>
          <div className="col-md-4 course-details-action">
            <div ref={el => this.courseActionBar = el} className="course-action-container">
              <CourseDetailAction course={course}
                                  course_sections={course_sections}
                                  openEnrollCoursePopup={this.openEnrollPopup.bind(this)}
                                  {...this.props}></CourseDetailAction>
              <EnrollCoursePopup show={this.state.showEnrollPopup}
                                 course={course}
                                 acceptCallback={this.enrollToCourse.bind(this, course.id, user)}
                                 cancelCallback={this.closeEnrollPopup.bind(this)} >
              </EnrollCoursePopup>
              <EnrollCourseSuccessPopup show={this.state.showEnrollSuccessPopup}
                                        course={course}
                                        cancelCallback={this.closeEnrollSuccessPopup.bind(this)}>
              </EnrollCourseSuccessPopup>
            </div>
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
  enrollCourse: React.PropTypes.func.isRequired,
  fetchEnrolledCourseList: React.PropTypes.func.isRequired,
  isEnrolled: React.PropTypes.bool.isRequired
};

export default CourseDetail;
