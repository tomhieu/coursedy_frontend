import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './CourseGroup.scss'


class CourseGroup extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired
  }

  static defaultProps = {
    course: {}
  }

  render() {
    let { course } = this.props

    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 course-group"
           key={course.id}>
        <Link to={'#'} title={course.name} className="course-group__content">
          <img className="course-group__content__img" src={course.coverImage}
               alt={course.name}/>
          <span className="course-group__content__title">{course.name}</span>
        </Link>
      </div>
    )
  }
}

export default CourseGroup
