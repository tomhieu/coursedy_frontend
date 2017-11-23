import React, {Component} from "react";
import {TT} from "../../utils/locale";
import {CURRENCIES, PERIOD_TYPES} from "../../constants/Courses";
import FormField from "../Core/FormField";
import InlineEditFormField from "../Core/InlineEditFormField";
import ObjectUtils from "../../utils/ObjectUtils";
import styles from "./Course.module.scss";
import {SERVER_NAME} from "../../utils/CommonConstant";
import DateUtils from "utils/DateUtils";

class CourseForm extends Component {
    hideError(e) {
        e.preventDefault();
    }

    renderField(editMode, fieldId, showLabel, fieldLabel, placeholder, isMandatory, fieldName, typeField, content = "", options, displayStyle = "default-field", styleCustomField) {
        return editMode ? (
            <InlineEditFormField activated={this.props.activatedField === fieldId} formGroupId={fieldId} showLabel={showLabel} formLabel={fieldLabel} content={content} displayStyle={displayStyle} options={options}
                                 placeholder={placeholder} isMandatoryField={isMandatory} customClassName={styleCustomField}
                                 formControlName={fieldName} typeField={typeField} onActivatedField={this.props.onActivatedField} {...this.props}

            ></InlineEditFormField>
        ) : (
            <FormField formGroupId={fieldId} formLabel={fieldLabel} options={options}
                       placeholder={placeholder} isMandatoryField={isMandatory} customClassName={styleCustomField}
                       formControlName={fieldName} typeField={typeField}></FormField>
        )
    }

    render() {
        const {handleSubmit, editMode, onDropCoverImage, cover_image, submitting, pristine, valid, courseData, categories, course_levels} = this.props;
        const periodTypes = PERIOD_TYPES.map((type) => {
            return {text: TT.t(type), id: type};
        });
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
                                    <FormField formGroupId="cover_image_Id" formLabel={null} showLabel={false}
                                               isMandatoryField={false}
                                               previewUrl={cover_image != null ? SERVER_NAME + cover_image : null}
                                               zoneHeight="75px" internalPreview={true} formControlName="cover_image"
                                               typeField="upload_file" onUpload={onDropCoverImage}></FormField>
                                </div>
                            ): ('')
                        }
                        <div className={editMode ? styles.courseTitle : 'creation-course-title'}>
                            {this.renderField(editMode, "titleId", false, editMode ? null : this.context.t("course_title"), this.context.t("sample_course_title"), true, "title", "custom_input", editMode ? courseData.title: "", null, "", "inline-form-control")}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            {this.renderField(editMode, "category_id", true, this.context.t("course_category"), this.context.t("course_category"),
                                true, "category_id", "custom_select", editMode ? courseData.category.name: "", categories.map((category) => {
                                return {id: category.id, text: category.name}
                            }))}
                        </div>
                        <div className='col-sm-6'>
                            {this.renderField(editMode, "course_level_id", true, this.context.t("course_level"), this.context.t("course_level"),
                                true, "course_level_id", "custom_select", editMode ? courseData.course_level.name: "", course_levels)}
                        </div>
                    </div>
                    {/* Course category and course level */}

                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className={!editMode ? "datepicker-box" : ""}>
                                {this.renderField(editMode, "start_date_Id", true, this.context.t("start_date"), this.context.t("start_date"), true, "start_date", "datepicker", editMode ? courseData.start_date: "")}
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className={!editMode ? "datepicker-box" : ""}>
                                {this.renderField(editMode, "end_date_Id", true, this.context.t("end_date"), this.context.t("end_date"), true, "end_date", "datepicker", editMode ? courseData.end_date: "")}
                            </div>
                        </div>
                    </div>
                    {/* Course start date and end date */}

                    <div className='row'>
                        <div className='col-md-5 col-sm-5'>
                            <div className="d-flex flex-horizontal">
                                {this.renderField(editMode, "period_Id", true, this.context.t("period"), this.context.t("period"), true, "period", "custom_input", editMode ? courseData.period + " " + this.context.t(courseData.period_type): "")}
                                {this.renderField(editMode, "period_type_Id", false, this.context.t("period_type"), this.context.t("period_type"),
                                    false, "period_type", "custom_select", "", periodTypes)}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-3">
                            {this.renderField(editMode, "number_of_students_Id", true, this.context.t("number_of_students"), this.context.t("number_of_students"),
                                true, "number_of_students", "custom_input", editMode ? courseData.number_of_students.toString(): "")}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-5 col-sm-5'>
                            <div className="d-flex flex-horizontal">
                                {this.renderField(editMode, "tuition_fee_Id", true, this.context.t("tuition_fee"), this.context.t("tuition_fee"),
                                    true, "tuition_fee", "custom_input", editMode ? ObjectUtils.currencyFormat(courseData.tuition_fee, "VND"): "")}
                                {this.renderField(editMode, "currency_Id", false, this.context.t("tuition_currency"), this.context.t("tuition_currency"), false, "currency", "custom_select", "", concurrency)}
                            </div>
                        </div>
                    </div>
                    {
                        !editMode ? (
                        <div className="avatar-image">
                            <FormField formGroupId="cover_image_Id" formLabel={this.context.t("cover_image")}
                                       isMandatoryField={true}
                                       previewUrl={cover_image != null ? cover_image.previewUrl : null}
                                       zoneHeight="200px" internalPreview={true} formControlName="cover_image"
                                       typeField="upload_file" onUpload={onDropCoverImage}></FormField>
                        </div>
                        ) : (<div></div>)
                    }


                    {this.renderField(editMode, "description_Id", true, this.context.t("course_description"), this.context.t("course_description"),
                        true, "description", "custom_textarea", editMode ? courseData.description: "")}

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
    cover_image: React.PropTypes.string.isRequired,
    courseData: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array.isRequired,
    course_levels: React.PropTypes.array.isRequired
};

export default CourseForm;
