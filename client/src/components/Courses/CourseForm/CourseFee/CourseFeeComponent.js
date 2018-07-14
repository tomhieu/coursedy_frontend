import * as React from "react";
import {Component} from "react";
import {CURRENCIES} from "../../../../constants/Courses";
import CourseFeeViewMode from "./CourseFeeViewMode";
import CourseFeeEditMode from "./CourseFeeEditMode";

class CourseFeeComponent extends Component {
  render() {
    const {courseData, editCourseFee, onEditCourseFee} = this.props;
    const concurrency = CURRENCIES.map((type) => {
      return {text: type, id: type};
    });
    if (editCourseFee) {
      return (
        <CourseFeeEditMode concurrency={concurrency}
                           onEditCourseFee={onEditCourseFee} />
      )
    } else {
      return (
        <CourseFeeViewMode tuitionFee={courseData.tuition_fee}
                           currency={courseData.currency}
                           onEditFormField={onEditCourseFee} />
      )
    }
  }
}

CourseFeeComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFeeComponent.propTypes = {
  editCourseFee: React.PropTypes.bool,
  courseData: React.PropTypes.object,
  onEditCourseFee: React.PropTypes.func
};

export default CourseFeeComponent;