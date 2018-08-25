import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { globalHistory } from 'utils/globalHistory';
import PrimaryButton from '../../Core/PrimaryButton/PrimaryButton';


export default class CourseGroupFooter extends Component {
  static propTypes = {
    redirectUrl: PropTypes.string.isRequired,
    btnName: PropTypes.string.isRequired,
  }

  gotoSearchCourseList() {
    globalHistory.push(this.props.redirectUrl);
  }

  render() {
    return (
      <div className="row align-items-center justify-content-center mt-4">
        <div className="col-sm-4 course__footer">
          <PrimaryButton
            type="button"
            isPrimary
            round
            callback={this.gotoSearchCourseList.bind(this)}
            title={this.props.btnName}
          />
        </div>
      </div>
    );
  }
}
