import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as CoursesActions from 'actions/CoursesActionCreator'
import CourseGroup from 'components/Course/CourseGroup/CourseGroup'
import CourseGroupHeading from '../../components/Course/CourseGroup/CourseGroupHeading'
import CourseGroupFooter from '../../components/Course/CourseGroup/CourseGroupFooter'


class PopularCourseList extends Component {
  static contextTypes = {
    t: PropTypes.func.isRequired
  }

  static propTypes = {
    course: PropTypes.object.isRequired
  }

  static defaultProps = {
    course: {}
  }

  componentDidMount() {
    this.props.fetchPopularCourses()
  }

  render() {
    return (
      <section className="course__popular">
        <div className="container course__popular__content-wrap">
          <div className="row-margin">
            <CourseGroupHeading title={this.context.t('popular_courses')}/>
            <div className="row">
              {
                this.props.courses.map((course, index) => {
                  return (
                    <CourseGroup course={course} key={index}/>
                  )
                })
              }
            </div>
            <CourseGroupFooter
              redirectUrl="/courses"
              btnName={this.context.t('watch_all_courses')}/>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.HomePage.popularCourses
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CoursesActions, dispatch)
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(PopularCourseList)
