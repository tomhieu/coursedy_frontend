import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

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
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3" key={ course.id }>
        <div className="panel panel-default">
          <div className="panel-body">
            <Link to={'#'} title={ course.name } >
              <img src={ course.coverImage } alt={ course.name }/>
              <span>{ course.name }</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
