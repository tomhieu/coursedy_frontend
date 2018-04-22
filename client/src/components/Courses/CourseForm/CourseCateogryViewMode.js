import {Component} from "react";
import * as React from "react";
import CourseFormItem from "./CourseFormItem";

class CourseCategoryViewMode extends Component {
  render() {
    const {editMode, courseSpecializes, categories, category, course_specialize} = this.props;
    return (
      <div className="row">
        <div className='col-sm col-md medium-text'>
          <CourseFormItem editMode={editMode} fieldId="categoryId"
                          fieldLabel={this.context.t("course_category")}
                          placeholder={this.context.t("course_category")}
                          isMandatory={true}
                          fieldName="category_id"
                          typeField="custom_select"
                          content={editMode &&category ? category.name : ""}
                          options={categories.map((category) => {
                            return {id: category.id, text: category.name}
                          })}
                          styleCustomField="inline-form-control"
                          {...this.props}>
          </CourseFormItem>
        </div>
        {
          courseSpecializes.length > 0 ?
            <div className='col-sm col-md'>
              <CourseFormItem editMode={editMode} fieldId="course_specialize_id"
                              fieldLabel={this.context.t("course_specialize")}
                              isMandatory={true}
                              fieldName="course_specialize_id"
                              typeField="custom_select"
                              content={editMode && course_specialize ? course_specialize.name : ""}
                              options={courseSpecializes.map((spec) => {
                                return {id: spec.id, text: spec.name}
                              })}
                              styleCustomField="inline-form-control" {...this.props}>
              </CourseFormItem>
            </div>
            : null
        }
      </div>
    )
  }
}

CourseCategoryViewMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseCategoryViewMode.propType = {
  editMode: React.PropTypes.bool,
  courseSpecializes: React.PropTypes.array,
  categories: React.PropTypes.array,
  category: React.PropTypes.object,
  course_specialize: React.PropTypes.object
}

export default CourseCategoryViewMode;