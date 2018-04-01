import {Component} from "react";
import FormField from "../../Core/FormField";
import * as React from "react";
import DateUtils from "utils/DateUtils";
import {DAYS_IN_WEEK} from "../../../actions/CourseFormActionCreator";
import styles from "./../Course.module.scss";
import {TT} from "utils/locale";
import {HOURS_IN_DAY} from "actions/CourseFormActionCreator";
import {FormGroup} from "react-bootstrap";

class SelectionTeachingDayEditMode extends Component {

    render() {
        const {editable, courseData, isSamePeriod, selectedDays} = this.props;
        return (
            <div className="row">
                <div className='col-sm col-md'>
                    <FormField editMode={editable} fieldId="course_days_id"
                               fieldLabel={this.context.t("date_in_week_course")}
                               placeholder={this.context.t("teaching_period_per_day")}
                               isMandatory={true}
                               formControlName="course_days"
                               typeField="multi_select"
                               content={editable ? DateUtils.getDayInWeekOfCourse(courseData.week_day_schedules) : ""}
                               options={DAYS_IN_WEEK.map((day) => {
                                   return {id: day.name + "_" + day.id, text: day.text}
                               })}
                               styleCustomField="inline-form-control" {...this.props}>
                    </FormField>
                </div>
                <div className="col-sm-12 col-md-12">
                    <FormField fieldId="is_same_period_id"
                               showLabel={false}
                               fieldLabel={this.context.t("teaching_period_per_day_similar")}
                               formControlName={"is_same_period"}
                               typeField="checkbox">
                    </FormField>
                </div>
                <div className="col-md-12 col-sm-12">
                    <div className={styles.timePickerContainer + " d-flex flex-horizontal flex-wrap"}>
                        {
                            !isSamePeriod ?
                                selectedDays.map((day) =>
                                    <div className={styles.timePickerBox + " d-flex"} key={"date_" + day.id}>
                                        <div className="d-flex flex-vertical">
                                            <span>{day.text}</span>
                                            <div>
                                                <FormField editMode={editable} fieldId={day.name + "_start_time_id"}
                                                           fieldLabel={this.context.t("start_time")}
                                                           isMandatory={true}
                                                           formControlName={day.name + "_start_time"}
                                                           typeField="custom_select"
                                                           options={HOURS_IN_DAY}
                                                           {...this.props}>
                                                </FormField>
                                            </div>
                                            {
                                                editable ? TT.t('to') : null
                                            }
                                            <div>
                                                <FormField editMode={editable} fieldId={day.name + "_end_time_id"}
                                                           fieldLabel={this.context.t("end_time")}
                                                           isMandatory={true}
                                                           formControlName={day.name + "_end_time"}
                                                           typeField="custom_select"
                                                           options={HOURS_IN_DAY}
                                                           {...this.props}>
                                                </FormField>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                <div className={styles.timePickerBox + " d-flex"}>
                                    <div className="d-flex flex-vertical">
                                        <div>
                                            <FormField editMode={editable} fieldId="start_time_id"
                                                       fieldLabel={this.context.t("start_time")}
                                                       isMandatory={true}
                                                       formControlName="start_time_id"
                                                       typeField="custom_select"
                                                       options={HOURS_IN_DAY}
                                                       {...this.props}>
                                            </FormField>
                                        </div>
                                        {
                                            editable ? TT.t('to') : null
                                        }
                                        <div>
                                            <FormField editMode={editable} fieldId="end_time_id"
                                                       fieldLabel={this.context.t("end_time")}
                                                       isMandatory={true}
                                                       formControlName="end_time_id"
                                                       typeField="custom_select"
                                                       options={HOURS_IN_DAY}
                                                       {...this.props}>
                                            </FormField>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

SelectionTeachingDayEditMode.contextTypes = {
    t: React.PropTypes.func.isRequired
}

SelectionTeachingDayEditMode.propType = {
    editable: React.PropTypes.bool,
    courseData: React.PropTypes.object,
    isSamePeriod: React.PropTypes.bool,
    selectedDays: React.PropTypes.array
}

export default SelectionTeachingDayEditMode;