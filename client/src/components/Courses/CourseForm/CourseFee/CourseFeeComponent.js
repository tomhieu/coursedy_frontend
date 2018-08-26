import * as React from 'react';
import { Component } from 'react';
import { CURRENCIES } from '../../../../constants/Courses';
import CourseFeeViewMode from './CourseFeeViewMode';
import CourseFeeEditMode from './CourseFeeEditMode';

class CourseFeeComponent extends Component {
  render() {
    const {
      courseData, editCourseFee, onEditCourseFee, editMode
    } = this.props;
    const concurrency = CURRENCIES.map((type) => {
      return { text: type, id: type };
    });
    if (editCourseFee) {
      return (
        <CourseFeeEditMode
          concurrency={concurrency}
          onEditCourseFee={onEditCourseFee}
        />
      );
    }
    return (
      <CourseFeeViewMode
        tuitionFee={courseData !== null ? courseData.tuition_fee : undefined}
        currency={courseData !== null ? courseData.currency : undefined}
        editMode={editMode}
        concurrency={concurrency}
        onActivatedField={onEditCourseFee}
      />
    );
  }
}

CourseFeeComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseFeeComponent.propTypes = {
  editCourseFee: React.PropTypes.bool,
  courseData: React.PropTypes.object,
  onEditCourseFee: React.PropTypes.func,
  editMode: React.PropTypes.bool.isRequired
};

export default CourseFeeComponent;
