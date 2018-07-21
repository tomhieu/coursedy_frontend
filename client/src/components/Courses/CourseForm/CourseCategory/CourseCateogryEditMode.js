import * as React from "react";
import {Component} from "react";
import FormField from "../../../Core/FormField";

class CourseCateogryEditMode extends Component {
  render() {
    const {courseSpecializes, categories} = this.props;
    return (
      <div className="row">
        <div className='col-sm-12 col-md-6 col-lg-6 medium-text'>
          <FormField fieldId="categoryId"
                     fieldLabel={this.context.t("course_category")}
                     placeholder={this.context.t("course_category")}
                     isMandatory={true}
                     formControlName="category_id"
                     typeField="custom_select"
                     options={categories.map((category) => {
                       return {id: category.id, text: category.name}
                     })}
                     styleCustomField="inline-form-control"
                     {...this.props}>
          </FormField>
        </div>
        {
          courseSpecializes.length > 0 ?
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <FormField fieldId="course_specialize_id"
                         fieldLabel={this.context.t("course_specialize")}
                         isMandatory={true}
                         formControlName="course_specialize_id"
                         typeField="custom_select"
                         options={courseSpecializes.map((spec) => {
                           return {id: spec.id, text: spec.name}
                         })}
                         styleCustomField="inline-form-control" {...this.props}>
              </FormField>
            </div>
            : null
        }
      </div>
    )
  }
}

CourseCateogryEditMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseCateogryEditMode.propType = {
  courseSpecializes: React.PropTypes.array,
  categories: React.PropTypes.array,
}

export default CourseCateogryEditMode;