import {Component} from "react";
import CourseFormItem from "./CourseFormItem";
import {CURRENCIES} from "../../../constants/Courses";
import * as React from "react";
import ObjectUtils from "utils/ObjectUtils";

class CourseFeeComponent extends Component {
  render() {
    const {isFree, editMode, courseData} = this.props;
    const concurrency = CURRENCIES.map((type) => {
      return {text: type, id: type};
    });
    if (isFree) {
      return (
        <div className="d-flex flex-col-1">
          <div className={editMode ? "d-flex flex-auto course-edit-free" : "d-flex flex-auto course-free"}>
            <CourseFormItem editMode={editMode} fieldId="is_free_id"
                            fieldLabel={this.context.t("course_free")}
                            isMandatory={false} showLabel={false}
                            fieldName="is_free"
                            typeField="checkbox"
                            content={editMode ? courseData.is_free ? this.context.t("course_free") : this.context.t("course_not_free") : ""}
                            {...this.props}>
            </CourseFormItem>
          </div>
        </div>
      )
    } else {
      return (
        <div className="d-flex flex-col-1">
          <div className="lg-field">
            <CourseFormItem editMode={editMode} fieldId="tuition_fee_Id"
                            fieldLabel={this.context.t("tuition_fee")}
                            isMandatory={true}
                            fieldName="tuition_fee"
                            typeField="custom_input"
                            content={editMode ? ObjectUtils.currencyFormat(courseData.tuition_fee, courseData.currency) : ""}
                            disabled={isFree}
                            {...this.props}>
            </CourseFormItem>
          </div>
          <div className="ml-10 currency-field">
            <CourseFormItem editMode={editMode} fieldId="currency_Id"
                            fieldLabel={this.context.t("tuition_currency")}
                            isMandatory={false}
                            fieldName="currency"
                            typeField="custom_select"
                            content={editMode ? courseData.currency : ""}
                            disabled={isFree}
                            options={concurrency}
                            {...this.props}>
            </CourseFormItem>
          </div>
          <div className={editMode ? "ml-20 d-flex flex-auto course-edit-free" : "ml-20 d-flex flex-auto course-free"}>
            <CourseFormItem editMode={editMode} fieldId="is_free_id"
                            fieldLabel={this.context.t("course_free")}
                            isMandatory={false} showLabel={false}
                            fieldName="is_free"
                            typeField="checkbox"
                            content={editMode ? isFree ? this.context.t("course_free") : this.context.t("course_not_free") : ""}
                            {...this.props}>
            </CourseFormItem>
          </div>
        </div>
      )
    }
  }
}

CourseFeeComponent.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFeeComponent.propTypes = {
  isFree: React.PropTypes.bool.isRequired,
  editMode: React.PropTypes.bool,
  courseData: React.PropTypes.object,
};

export default CourseFeeComponent;