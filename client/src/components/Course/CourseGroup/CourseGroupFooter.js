import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


export default class CourseGroupFooter extends Component {
  static propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    btnName: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 mtop4 text-center">
          <Link to={ this.props.redirectUrl }
             className="btn-link">{this.props.btnName}</Link>
        </div>
      </div>
    )
  }
}
