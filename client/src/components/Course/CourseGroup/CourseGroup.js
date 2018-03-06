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
      <div className="slick-slide_item course-group"
           key={course.id}>
        <Link to={'#'} title={course.title} className="course-group__content">
          <img className="course-group__content__img" src={course.cover_image}
               alt={course.title}/>
          <span className="course-group__content__title">{course.title}</span>
        </Link>
      </div>
    )
  }
}

export default CourseGroup
