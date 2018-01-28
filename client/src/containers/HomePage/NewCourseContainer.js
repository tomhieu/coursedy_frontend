import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


export default class NewCourse extends Component {
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
        <Link className="course-group__content" to={'#'} title={course.name}>
          <img className="course-group__content__img" src={course.coverImage}
               alt={course.name}/>
          <span className="course-group__content__title">{course.name}</span>
        </Link>
      </div>
    )
  }
}
