import React, {Component} from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import {reduxForm} from 'redux-form';
import {TT} from '../../utils/locale';
import {renderDatePicker, renderSelect, renderField, renderTextAreaField, renderSingleFileInput} from "../CustomComponents";
import {PERIOD_TYPES, CURRENCIES} from '../../constants/Courses'
import {Link} from "react-router-dom";
import FormField from "../Core/FormField";

class CourseForm extends Component {
  hideError(e) {
    e.preventDefault();
  }

  render() {
    const {handleSubmit, addLesson, onDropCoverImage, cover_image, submitting, pristine, valid, courseData, categories, course_levels } = this.props;
    const errors = null;
    const periodTypes = PERIOD_TYPES.map((type) => {
      return {text: TT.t(type), id: type};
    });
    const concurrency = CURRENCIES.map((type) => {
      return {text: type, id: type};
    });
    debugger
    return (
      <div className="dashboard-panel">
        <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
          <div className={errors ? '' : 'hidden'}>
            <span className="error">
              <div className="alert alert-danger">
                <a href="#" className="close" onClick={this.hideError.bind(this)}>×</a>
                <strong>{this.context.t("error")} ! </strong>
                <p className="error">{errors && errors[0]}</p>
              </div>
            </span>
          </div>

          <FormField formGroupId="titleId" formLabel={this.context.t("course_title")} placeholder={this.context.t("sample_course_title")} isMandatoryField={true} formControlName="title" typeField="custom_input"></FormField>

          <div className='row'>
            <div className='col-sm-6'>
              <FormField formGroupId="category_id" formLabel={this.context.t("course_category")} placeholder={this.context.t("course_category")}
                         options={categories.map((category) => {
                             return {id: category.id, text: category.name}
                         })} isMandatoryField={true} formControlName="category_id" typeField="custom_select" {...this.props}></FormField>
            </div>
            <div className='col-sm-6'>
              <FormField formGroupId="course_level_id" formLabel={this.context.t("course_level")} placeholder={this.context.t("course_level")}
                         options={course_levels} isMandatoryField={true} formControlName="course_level_id" typeField="custom_select"></FormField>
            </div>
          </div>{/* Course category and course level */}

          <div className='row'>
            <div className='col-sm-6'>
              <div className="datepicker-box">
                <FormField formGroupId="start_date_Id" formLabel={this.context.t("start_date")} isMandatoryField={true} formControlName="start_date" typeField="datepicker"></FormField>
              </div>
            </div>
            <div className='col-sm-6 datepicker-box'>
              <div className="datepicker-box">
                <FormField formGroupId="end_date_Id" formLabel={this.context.t("end_date")} isMandatoryField={true} formControlName="end_date" typeField="datepicker"></FormField>
              </div>
            </div>
          </div>{/* Course start date and end date */}

          <div className='row'>
            <div className='col-md-5 col-sm-5'>
              <div className="d-flex flex-horizontal">
                <FormField formGroupId="period_Id" formLabel={this.context.t("period")} isMandatoryField={true} formControlName="period" typeField="custom_input"></FormField>
                <FormField formGroupId="period_type_Id" formLabel="" isMandatoryField={false} options={periodTypes} formControlName="period_type" typeField="custom_select"></FormField>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <FormField formGroupId="number_of_students_Id" formLabel={this.context.t("number_of_students")} isMandatoryField={true} formControlName="number_of_students" typeField="custom_input"></FormField>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-5 col-sm-5'>
              <div className="d-flex flex-horizontal">
                <FormField formGroupId="tuition_fee_Id" formLabel={this.context.t("tuition_fee")} isMandatoryField={true} formControlName="tuition_fee" typeField="custom_input"></FormField>
                <FormField formGroupId="currency_Id" formLabel="" isMandatoryField={false} options={concurrency} formControlName="currency" typeField="custom_select"></FormField>
              </div>
            </div>
          </div>

          <div className="avatar-image">
            <FormField formGroupId="cover_image_Id" formLabel={this.context.t("cover_image")} isMandatoryField={true} previewUrl={cover_image != null ? cover_image.previewUrl : null}
                       zoneHeight="200px" internalPreview={true} formControlName="cover_image" typeField="upload_file" onUpload={onDropCoverImage}></FormField>
          </div>

          <hr/>

          <FormField formGroupId="description_Id" formLabel={this.context.t("course_description")} isMandatoryField={true} rows={10} formControlName="description" typeField="custom_textarea"></FormField>

          <div className="row">
            <div className="col-md-12 col-sm-12">
              <button type="submit" className="btn btn-primary btn-link-dark signin-btn mr-10 ml-15"
                      disabled={((pristine || submitting) && courseData) || !valid}>
                  {this.context.t("save_course")}
              </button>
              {this.props.courseId && Number(this.props.courseId) > 0 ? (
                  <button onClick={addLesson} className="btn btn-primary btn-link-dark" disabled={((pristine || submitting) && courseData) || !valid}>{this.context.t('lesson_list_next')}</button>
              ): null}

            </div>
          </div>
        </form>
      </div>
    )
  }
}

CourseForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseForm.propTypes = {}

export default CourseForm;
