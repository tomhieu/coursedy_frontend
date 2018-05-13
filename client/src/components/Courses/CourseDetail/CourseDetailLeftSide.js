import React, { Component } from 'react'
import './CourseDetailLeftSide.scss'
import {
  PUBLIC_COURSE_DETAIL_MENU_INTRO,
  PUBLIC_COURSE_DETAIL_MENU_LESSONS,
  PUBLIC_COURSE_DETAIL_MENU_TEACHER,
  PUBLIC_COURSE_DETAIL_MENU_COMMENTS,
  PUBLIC_COURSE_DETAIL_MENU_RELATED
} from "../../../constants/WebConstants.js"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { 
  CourseDetailFollowContainer,
  CourseDetailEnrollContainer
} from "../../../containers/index.js"

class CourseDetailLeftSide extends Component {
  render() {
    const {
      activeMenu, displayFixedSidebar,
      course_sections, relatedCourses
    } = this.props
    return (
      <div 
        className={ displayFixedSidebar ? 
          "col-md-3 no-pad d-none d-md-block sidebar-fixed-scrolled" :
          "col-md-3 no-pad d-none d-md-block sidebar-fixed-normal"
        } 
      >
        <aside className="sidebar-wrapper">
          <div className="scrollspy-sidebar alt-style-01 affix-top">
            <ul className="scrollspy-sidenav">
              <li className="sidebar-heading"><h5>{this.context.t('course_menu')}</h5></li>
              <li className="">
                <ul className="course-detail-left-nav">
                  <li className={activeMenu === 'course-detail-intro' ? 'active' : ''}>
                    <AnchorLink href='#course-detail-intro' className="anchor">{this.context.t('course_intro')}</AnchorLink>
                  </li>
                  {
                    course_sections.length ?
                    <li className={activeMenu === 'course-detail-lessons' ? 'active' : ''}>
                      <AnchorLink href='#course-detail-lessons' className="anchor">{this.context.t('course_lessons')}</AnchorLink>
                    </li> : null
                  }
                  <li className={activeMenu === 'course-detail-tutor' ? 'active' : ''}>
                    <AnchorLink href='#course-detail-tutor' className="anchor">{this.context.t('course_teacher')}</AnchorLink>
                  </li>
                  <li className={activeMenu === 'course-detail-comments' ? 'active' : ''}>
                    <AnchorLink href='#courses-detail-comments' className="anchor">{this.context.t('course_comments')}</AnchorLink>
                  </li>
                  {
                    relatedCourses.length ?
                    <li className={activeMenu === 'course-detail-related' ? 'active' : ''}>
                      <AnchorLink href='#course-detail-related' className="anchor">{this.context.t('course_related')}</AnchorLink>
                    </li> : null
                  }
                  
                </ul>
              </li>
            </ul>
          </div>

          <div className="clearfix mb-20 mt-30">
            <CourseDetailEnrollContainer />
          </div>
          
          <div className="call-featured">
            <div className="icon">
              <i className="fa fa-phone"></i>
            </div>
            <div className="content">
              <p className="phone-number">
                +66-85-658-8754
              </p>
            </div>
          </div>
          <div className="favor-link-wrapper mb-30">
            <CourseDetailFollowContainer />
          </div>
        </aside>
      </div>
    )
  }
}

CourseDetailLeftSide.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseDetailLeftSide.propTypes = {
};

export default CourseDetailLeftSide;