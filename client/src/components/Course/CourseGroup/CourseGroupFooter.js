import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PrimaryButton from "../../Core/PrimaryButton/PrimaryButton";


export default class CourseGroupFooter extends Component {
  static propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    btnName: PropTypes.string.isRequired,
  }

  gotoSearchCourseList() {

  }

  render() {
    return (
      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-sm-4 course__footer">
          <PrimaryButton type="button" isPrimary={true} round={true}
                         callback={this.gotoSearchCourseList.bind(this)} title={this.props.btnName}>
          </PrimaryButton>
        </div>
      </div>
    )
  }
}
