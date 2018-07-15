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
import {
  TRIGGER_DISPLAY_FIX_HEADER_BAR_OFFSET,
  CHECK_ACTIVE_MENU_OFFSET
} from "../../constants/WebConstants.js"

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
      activeMenu: 'course-detail-intro'
    }
    this.onScroll = this.checkScrollPosition.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.scrollTo(0,0)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  /*
    @Check scroll position for active menu, display header bar
  */
  checkScrollPosition() {
    const currentPosition  = window.pageYOffset || document.documentElement.scrollTop
    this.setState({
      currentScrollPosition: currentPosition,
      activeMenu: Object.keys(this.props.sectionPositions).reduce(
        (currentPosition, newPosition) => {
          return this.props.sectionPositions[newPosition] < CHECK_ACTIVE_MENU_OFFSET 
            ? newPosition : currentPosition
        }, 'course-detail-intro'
      )
    })
  }

  render() {
    const { activeMenu, currentScrollPosition } = this.state
    return (
      <div className="d-flex flex-auto flex-vertical full-width-in-container">
        <CourseDetailHeader
          {...this.props}
        />
        <CourseDetailMain
          {...this.props}
          activeMenu={activeMenu}
          currentScrollPosition={currentScrollPosition}
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
