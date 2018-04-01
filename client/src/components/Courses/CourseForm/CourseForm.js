import React, {Component} from "react";
import {CURRENCIES} from "../../../constants/Courses";
import FormField from "../../Core/FormField";
import InlineEditFormField from "../../Core/InlineEditFormField";
import ObjectUtils from "../../../utils/ObjectUtils";
import styles from "./../Course.module.scss";
import {SERVER_NAME} from "../../../utils/CommonConstant";
import CourseFormItem from "./CourseFormItem";
import SelectionTeachingDay from "./SelectionTeachingDay";

class CourseForm extends Component {

  render() {
    const {handleSubmit, editMode, onDropCoverImage, cover_image, submitting, pristine,
      valid, courseData, categories, courseSpecializes, selectedDays, isSamePeriod, isFree} = this.props;
    const concurrency = CURRENCIES.map((type) => {
      return {text: type, id: type};
    });
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
          <div className={editMode ? "d-flex flex-horizontal justify-content-center mt-30 mb-30" : "d-flex flex-horizontal"}>
            {
              editMode ? (
                <div className={styles.avatarImage}>
                  <FormField fieldId="cover_image_Id"
                             showLabel={false}
                             isMandatoryField={false}
                             previewUrl={cover_image != null ? SERVER_NAME + cover_image : null}
                             zoneHeight="150px"
                             internalPreview={true}
                             formControlName="cover_image"
                             typeField="upload_file"
                             onUpload={onDropCoverImage}>
                  </FormField>
                </div>
              ) : ('')
            }
            <div className={editMode ? styles.courseTitle + ' d-flex align-items-center' : 'creation-course-title'}>
              <CourseFormItem editMode={editMode} fieldId="titleId" showLabel={false}
                              fieldLabel={editMode ? "" : this.context.t("course_title")}
                              placeholder={this.context.t("sample_course_title")}
                              isMandatory={true}
                              fieldName="title"
                              typeField="custom_input"
                              content={editMode ? courseData.title : ""}
                              styleCustomField="inline-form-control" {...this.props}>
              </CourseFormItem>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm col-md'>
              <CourseFormItem editMode={editMode} fieldId="categoryId"
                              fieldLabel={this.context.t("course_category")}
                              placeholder={this.context.t("course_category")}
                              isMandatory={true}
                              fieldName="category_id"
                              typeField="custom_select"
                              content={editMode && courseData.category ? courseData.category.name : ""}
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
                                  content={editMode && courseData.course_specialize ? courseData.course_specialize.name : ""}
                                  options={courseSpecializes.map((spec) => {
                                      return {id: spec.id, text: spec.name}
                                  })}
                                  styleCustomField="inline-form-control" {...this.props}>
                  </CourseFormItem>
                </div>
                : null
            }
          </div>
          {/* Course category and course level */}

          <div className='row'>
            <div className='col-sm col-md'>
              <div className={!editMode ? "datepicker-box" : ""}>
                <CourseFormItem editMode={editMode} fieldId="start_date_Id"
                                fieldLabel={this.context.t("start_date")}
                                isMandatory={true}
                                fieldName="start_date"
                                typeField="datepicker"
                                content={editMode ? courseData.start_date : ""}
                                {...this.props}>
                </CourseFormItem>
              </div>
            </div>
            <div className='col-md col-sm'>
              <div className="d-flex flex-horizontal">
                <div>
                  <CourseFormItem editMode={editMode} fieldId="period_Id"
                                  fieldLabel={this.context.t("period")}
                                  isMandatory={true}
                                  fieldName="period"
                                  typeField="custom_input"
                                  content={editMode ? courseData.period + " " + this.context.t("course_periode_type") : ""}
                                  {...this.props}>
                  </CourseFormItem>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12">
              <CourseFormItem editMode={editMode} fieldId="number_of_students_Id"
                              fieldLabel={this.context.t("number_of_students")}
                              isMandatory={true}
                              fieldName="number_of_students"
                              typeField="custom_input"
                              content={editMode ? courseData.number_of_students.toString() : ""}
                              {...this.props}>
              </CourseFormItem>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <div className="d-flex flex-horizontal">
                <div className="d-flex flex-col-1">
                  <div className="d-flex flex-col-3">
                    <CourseFormItem editMode={editMode} fieldId="tuition_fee_Id"
                                    fieldLabel={this.context.t("tuition_fee")}
                                    isMandatory={true}
                                    fieldName="tuition_fee"
                                    typeField="custom_input"
                                    content={editMode ? ObjectUtils.currencyFormat(courseData.tuition_fee, "VND") : ""}
                                    disabled={isFree}
                                    {...this.props}>
                    </CourseFormItem>
                  <div className="ml-10 d-flex flex-col-1 currency-field">
                    <CourseFormItem editMode={editMode} fieldId="currency_Id"
                                    fieldLabel={this.context.t("tuition_currency")}
                                    isMandatory={false}
                                    fieldName="currency"
                                    typeField="custom_select"
                                    content=""
                                    disabled={isFree}
                                    options={concurrency}
                                    {...this.props}>
                    </CourseFormItem>
                  </div>
                </div>
                <div className="ml-20 d-flex flex-col-1 course-free">
                  <FormField fieldId="is_free_id"
                             showLabel={false}
                             formLabel={this.context.t("course_free")}
                             formControlName={"is_free"}
                             typeField="checkbox">
                  </FormField>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="row">
            <SelectionTeachingDay editable={editMode} courseData={courseData}
                                  isSamePeriod={isSamePeriod}
                                  selectedDays={selectedDays} {...this.props}>
            </SelectionTeachingDay>
          </div>

          {
            !editMode ? (
              <div className="avatar-image">
                <FormField fieldId="cover_image_Id"
                           fieldLabel={this.context.t("cover_image")}
                           isMandatoryField={true}
                           previewUrl={cover_image != null ? cover_image.previewUrl : null}
                           zoneHeight="200px"
                           internalPreview={true}
                           formControlName="cover_image"
                           typeField="upload_file"
                           onUpload={onDropCoverImage}>
                </FormField>
              </div>
            ) : (<div></div>)
          }

          <CourseFormItem editMode={editMode} fieldId="description_Id"
                          fieldLabel={this.context.t("course_description")}
                          isMandatory={true}
                          fieldName="description"
                          typeField="custom_textarea"
                          content={editMode ? courseData.description : ""}
                          disabled={false}
                          {...this.props}>
          </CourseFormItem>

          {
            !editMode ? (
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <button type="submit" className="btn btn-primary btn-link-dark signin-btn mr-10 ml-15"
                          disabled={((pristine || submitting) && courseData) || !valid}>
                    {this.context.t("save_course")}
                  </button>
                </div>
              </div>
            ) : ''
          }

        </form>
      </div>
    )
  }
}

CourseForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.bool.isRequired,
  onDropCoverImage: React.PropTypes.func.isRequired,
  categories: React.PropTypes.array.isRequired,
  courseSpecializes: React.PropTypes.array.isRequired,
  isSamePeriod: React.PropTypes.bool.isRequired,
  isFree: React.PropTypes.bool.isRequired
};

export default CourseForm;
