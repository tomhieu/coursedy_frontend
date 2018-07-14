import {Component} from "react";
import * as React from "react";
import {DAYS_IN_WEEK, HOURS_IN_DAY} from "../../../../actions/CourseFormActionCreator";
import styles from "./../../Course.module.scss";
import DateUtils from "utils/DateUtils";
import {TT} from "utils/locale";
import CourseFormItem from "../CourseFormItem";
import FormField from "../../../Core/FormField";

class SelectionTeachingDayViewMode extends Component {
  render() {
    const {editable, courseData, isSamePeriod, selectedDays} = this.props;
    return (
      <div className="row">
        <div className='col-sm col-md'>
          <CourseFormItem editMode={editable} fieldId="course_days_id"
                          fieldLabel={this.context.t("date_in_week_course")}
                          placeholder={this.context.t("teaching_period_per_day")}
                          isMandatory={true}
                          fieldName="course_days"
                          typeField="multi_select"
                          content={editable ? DateUtils.getDayInWeekOfCourse(courseData.week_day_schedules) : ""}
                          options={DAYS_IN_WEEK.map((day) => {
                            return {id: day.name + "_" + day.id, text: day.text}
                          })}
                          styleCustomField="inline-form-control" {...this.props}>
          </CourseFormItem>
        </div>
        {
          !editable ?
            <div className="col-sm-12 col-md-12">
              <FormField fieldId="is_same_period_id"
                         showLabel={false}
                         fieldLabel={this.context.t("teaching_period_per_day_similar")}
                         formControlName={"is_same_period"}
                         typeField="checkbox">
              </FormField>
            </div> : null
        }
        <div className="col-md-12 col-sm-12">
          <div className={styles.timePickerContainer + " d-flex flex-horizontal flex-wrap"}>
            {
              !isSamePeriod ?
                selectedDays.map((day) =>
                  <div className={styles.timePickerBox + " d-flex"} key={"date_" + day.id}>
                    <div className="d-flex flex-vertical">
                      <span>{day.text}</span>
                      <div>
                        <CourseFormItem editMode={editable} fieldId={day.name + "_start_time_id"}
                                        fieldLabel={this.context.t("start_time")}
                                        isMandatory={true}
                                        fieldName={day.name + "_start_time"}
                                        typeField="custom_select"
                                        options={HOURS_IN_DAY}
                                        content={editable ? DateUtils.retrieveStartTimeOfDay(courseData.course_days, day.name) : ""}
                                        {...this.props}>
                        </CourseFormItem>
                      </div>
                      {
                        editable ? TT.t('to') : null
                      }
                      <div>
                        <CourseFormItem editMode={editable} fieldId={day.name + "_end_time_id"}
                                        fieldLabel={this.context.t("end_time")}
                                        isMandatory={true}
                                        fieldName={day.name + "_end_time"}
                                        typeField="custom_select"
                                        options={HOURS_IN_DAY}
                                        content={editable ? DateUtils.retrieveEndTimeOfDay(courseData.course_days, day.name) : ""}
                                        {...this.props}>
                        </CourseFormItem>
                      </div>
                    </div>
                  </div>
                ) : selectedDays.length > 0 ?
                <div className={styles.timePickerBox + " d-flex"}>
                  <div className="d-flex flex-vertical">
                    <div>
                      <CourseFormItem editMode={editable} fieldId="start_time_id"
                                      fieldLabel={this.context.t("start_time")}
                                      isMandatory={true}
                                      fieldName="start_time_id"
                                      typeField="custom_select"
                                      options={HOURS_IN_DAY}
                                      content={editable ? DateUtils.retrieveStartTimeOfDay(courseData.course_days, null) : ""}
                                      {...this.props}>
                      </CourseFormItem>
                    </div>
                    {
                      editable ? TT.t('to') : null
                    }
                    <div>
                      <CourseFormItem editMode={editable} fieldId="end_time_id"
                                      fieldLabel={this.context.t("end_time")}
                                      isMandatory={true}
                                      fieldName="end_time_id"
                                      typeField="custom_select"
                                      options={HOURS_IN_DAY}
                                      content={editable ? DateUtils.retrieveEndTimeOfDay(courseData.course_days, null) : ""}
                                      {...this.props}>
                      </CourseFormItem>
                    </div>
                  </div>
                </div> : null
            }
          </div>
        </div>
      </div>
    )
  }
}

SelectionTeachingDayViewMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

SelectionTeachingDayViewMode.propType = {
  editable: React.PropTypes.bool,
  courseData: React.PropTypes.object,
  isSamePeriod: React.PropTypes.bool,
  selectedDays: React.PropTypes.array
}

export default SelectionTeachingDayViewMode