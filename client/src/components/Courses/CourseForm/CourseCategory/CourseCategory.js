import * as React from 'react';
import { FormGroup } from 'react-bootstrap';
import { Component } from 'react';
import CourseCateogryEditMode from './CourseCateogryEditMode';
import CourseCateogryViewMode from './CourseCateogryViewMode';
import PrimaryButton from '../../../Core/PrimaryButton/PrimaryButton';

class CourseCategory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      editCourseCategory, pristine, submitting, onEditCourseCategory, canEditable
    } = this.props;
    if (!editCourseCategory) {
      return (
        <div>
          <CourseCateogryViewMode {...this.props} canEditable={canEditable} onActivatedField={onEditCourseCategory} />
        </div>
      );
    }
    return (
      <div>
        <CourseCateogryEditMode {...this.props} />
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <FormGroup className="d-flex justify-content-right">
              <PrimaryButton
                type="submit"
                line={false}
                disabled={pristine || submitting}
                title={this.context.t('save')}
              />
              <PrimaryButton
                type="button"
                isPrimary={false}
                customClasses="ml-15"
                callback={onEditCourseCategory}
                title={this.context.t('cancel')}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

CourseCategory.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CourseCategory.propType = {
  editMode: React.PropTypes.bool,
  courseSpecializes: React.PropTypes.array,
  categories: React.PropTypes.array,
  category: React.PropTypes.object,
  course_specialize: React.PropTypes.object,
  onEditCourseCategory: React.PropTypes.func,
  canEditable: React.PropTypes.bool
};

export default CourseCategory;
