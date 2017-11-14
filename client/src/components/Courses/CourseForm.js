import React, {Component} from 'react';
import {FormGroup, ControlLabel} from 'react-bootstrap';
import {Field} from 'redux-form';
import {reduxForm} from 'redux-form';
import {TT} from '../../utils/locale';
import {
    renderDatePicker,
    renderSelect,
    renderField,
    renderTextAreaField,
    renderSingleFileInput
} from "../CustomComponents";
import {PERIOD_TYPES, CURRENCIES} from '../../constants/Courses'
import {Link} from "react-router-dom";
import FormField from "../Core/FormField";
import InlineEditFormField from "../Core/InlineEditFormField";

class CourseForm extends Component {
    hideError(e) {
        e.preventDefault();
    }

    renderField(editMode, fieldId, fieldLabel, placeholder, isMandatory, fieldName, typeField, content = "", options) {
        return editMode ? (
            <InlineEditFormField formGroupId={fieldId} formLabel={this.context.t(fieldLabel)} content={content} options={options}
                                 placeholder={this.context.t(placeholder)} isMandatoryField={isMandatory}
                                 formControlName={fieldName} typeField={typeField}></InlineEditFormField>
        ) : (
            <FormField formGroupId={fieldId} formLabel={this.context.t(fieldLabel)} options={options}
                       placeholder={this.context.t(placeholder)} isMandatoryField={isMandatory}
                       formControlName={fieldName} typeField={typeField}></FormField>
        )
    }

    render() {
        const {handleSubmit, addSection, editMode, onDropCoverImage, cover_image, submitting, pristine, valid, courseData, categories, course_levels} = this.props;
        const periodTypes = PERIOD_TYPES.map((type) => {
            return {text: TT.t(type), id: type};
        });
        const concurrency = CURRENCIES.map((type) => {
            return {text: type, id: type};
        });
        return (
            <div className="dashboard-panel">
                <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
                    {this.renderField(editMode, "titleId", "course_title", "sample_course_title", true, "title", "custom_input", editMode ? courseData.title: null)}

                    <div className='row'>
                        <div className='col-sm-6'>
                            {this.renderField(editMode, "category_id", "course_category", "course_category", true, "category_id", "custom_select", editMode ? courseData.category_id: null, categories.map((category) => {
                                return {id: category.id, text: category.name}
                            }))}
                        </div>
                        <div className='col-sm-6'>
                            {this.renderField(editMode, "course_level_id", "course_level", "course_level", true, "course_level_id", "custom_select", editMode ? courseData.course_level_id: null, course_levels)}
                        </div>
                    </div>
                    {/* Course category and course level */}

                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className="datepicker-box">
                                {this.renderField(editMode, "start_date_Id", "start_date", "start_date", true, "start_date", "datepicker", editMode ? courseData.start_date: null)}
                            </div>
                        </div>
                        <div className='col-sm-6 datepicker-box'>
                            <div className="datepicker-box">
                                {this.renderField(editMode, "end_date_Id", "end_date", "end_date", true, "end_date", "datepicker", editMode ? courseData.end_date: null)}
                            </div>
                        </div>
                    </div>
                    {/* Course start date and end date */}

                    <div className='row'>
                        <div className='col-md-5 col-sm-5'>
                            <div className="d-flex flex-horizontal">
                                {this.renderField(editMode, "period_Id", "period", "period", true, "period", "custom_input", editMode ? courseData.period: null)}
                                {this.renderField(editMode, "period_type_Id", null, null, false, "period_type", "custom_select", editMode ? courseData.period_type: null, periodTypes)}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-3">
                            {this.renderField(editMode, "number_of_students_Id", "number_of_students", "number_of_students", true, "period_type", "custom_input", editMode ? courseData.number_of_students: null)}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-5 col-sm-5'>
                            <div className="d-flex flex-horizontal">
                                {this.renderField(editMode, "tuition_fee_Id", "tuition_fee", "tuition_fee", true, "tuition_fee", "custom_input", editMode ? courseData.tuition_fee: null)}
                                {this.renderField(editMode, "currency_Id", null, null, false, "currency", "custom_select", editMode ? courseData.currency: null, concurrency)}
                            </div>
                        </div>
                    </div>

                    <div className="avatar-image">
                        <FormField formGroupId="cover_image_Id" formLabel={this.context.t("cover_image")}
                                   isMandatoryField={true}
                                   previewUrl={cover_image != null ? cover_image.previewUrl : null}
                                   zoneHeight="200px" internalPreview={true} formControlName="cover_image"
                                   typeField="upload_file" onUpload={onDropCoverImage}></FormField>
                    </div>

                    <hr/>
                    {this.renderField(editMode, "description_Id", "course_description", "course_description", true, "description", "custom_textarea", editMode ? courseData.description: null)}

                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <button type="submit" className="btn btn-primary btn-link-dark signin-btn mr-10 ml-15"
                                    disabled={((pristine || submitting) && courseData) || !valid}>
                                {this.context.t("save_course")}
                            </button>
                            {this.props.courseId && Number(this.props.courseId) > 0 ? (
                                <button onClick={addSection} className="btn btn-primary btn-link-dark"
                                        disabled={((pristine || submitting) && courseData) || !valid}>{this.context.t('lesson_list_next')}</button>
                            ) : null}

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
