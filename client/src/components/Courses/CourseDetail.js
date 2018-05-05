import React, {Component} from 'react';
import CourseDetailHeader from './CourseDetail/CourseDetailHeader';
import CourseDetailMain from './CourseDetail/CourseDetailMain';

import CourseDetailGeneral from './CourseDetail/CourseDetailGeneral';
import CourseDetailLessons from './CourseDetail/CourseDetailLessons';
import CourseDetailComments from './CourseDetail/CourseDetailComments';
import cssModules from 'react-css-modules';
import './CourseDetail.scss';

import {CoreComponent} from '../index';
import {PUBLIC_COURSE_MAX_NUMBER_COMMENTS_PER_LOAD} from '../../constants/Courses';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayFixedSidebar: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll(event) {
    const triggerPosition = 100
    const top  = window.pageYOffset || document.documentElement.scrollTop
    if (triggerPosition < top) {
      this.setState({
        displayFixedSidebar: true
      })
    } else {
      this.setState({
        displayFixedSidebar: false
      })
    }
  }

  render() {
    const { displayFixedSidebar } = this.state
    return (
      <div className="course-detail">
        <CourseDetailHeader
          {...this.props}
          displayFixedSidebar={displayFixedSidebar}
        />
        <CourseDetailMain
          {...this.props}
          displayFixedSidebar={displayFixedSidebar}
        />
      </div>
    )
  }
}

CourseDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetail.propTypes = {
};

export default CourseDetail;
