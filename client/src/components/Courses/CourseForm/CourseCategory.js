import CourseCateogryViewMode from "./CourseCateogryViewMode";
import * as React from "react";
import CourseCateogryEditMode from "./CourseCateogryEditMode";
import {FormGroup} from "react-bootstrap";
import {Component} from "react";

class CourseCategory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {editCourseCategory, pristine, submitting, onEditCourseCategory} = this.props;
    if (!editCourseCategory) {
      return (
        <div>
          <CourseCateogryViewMode {...this.props} onActivatedField={onEditCourseCategory}>
          </CourseCateogryViewMode>
        </div>
      )
    } else {
      return (
        <div>
          <CourseCateogryEditMode {...this.props}>
          </CourseCateogryEditMode>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <FormGroup className="d-flex justify-content-right">
                <button type="submit" className="btn accept-btn mr-10" disabled={pristine || submitting}>
                  {this.context.t("save")}
                </button>
                <button type='button' onClick={onEditCourseCategory}
                        className="btn btn-default btn-small margin-left-10 cancel-button">
                  {this.context.t("cancel")}
                </button>
              </FormGroup>
            </div>
          </div>
        </div>
      )
    }
  }
}

CourseCategory.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseCategory.propType = {
  editMode: React.PropTypes.bool,
  courseSpecializes: React.PropTypes.array,
  categories: React.PropTypes.array,
  category: React.PropTypes.object,
  course_specialize: React.PropTypes.object,
  onEditCourseCategory: React.PropTypes.func,
}

export default CourseCategory;