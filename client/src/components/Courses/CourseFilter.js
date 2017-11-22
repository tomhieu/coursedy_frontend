import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import {tuitionFees} from '../../constants/CourseFilter'
import FormField from "../Core/FormField";
import {FieldArray} from "redux-form";

class CourseFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openAdFilter: false
        }
    }

    toggleFilter() {
        this.setState(
            {openAdFilter: !this.state.openAdFilter}
        )
    }

    renderCourseLevels(selectedCategories) {
        return (
            <div className="checkbox-group">
                {
                    selectedCategories.map(cate =>
                        <div>
                            <span>{cate.name}</span>
                            <FieldArray name="filter_course_levels" component={() =>
                                <div>
                                    {cate.course_levels.map((filter_course_level) =>
                                        <div key={filter_course_level.id}>
                                            <FormField formGroupId="filter_course_levels" showLabel={false}
                                                       formLabel={filter_course_level.name}
                                                       formControlName={"filter_course_levels[" + filter_course_level.id + "]"} typeField="checkbox"></FormField>
                                        </div>
                                    )}
                                </div>
                            }/>
                        </div>
                    )
                }

            </div>
        )
    }

    renderDayOfWeek(weekdays) {
        return (
            <div className="checkbox-group">
                <FieldArray name="course_schedule_days" component={() =>
                    <div>
                        {
                            Object.keys(weekdays).map((k) =>
                                <div key={k}>
                                    <FormField formGroupId="course_schedule_day" showLabel={false}
                                               formLabel={weekdays[k]}
                                               formControlName={"course_schedule_days[" + k + "]"}
                                               typeField="checkbox"></FormField>
                                </div>
                            )
                        }
                    </div>
                }/>
            </div>
        )
    }

    renderTutorFees(tuitionFees) {
        return (
            <div className="d-flex flex-horizontal">
                <div className="select-course-fee">
                    <FormField formGroupId="filter_min_fees" showLabel={false} options={tuitionFees}
                               formControlName={"min_fees"} typeField="custom_select"></FormField>
                </div>
            </div>
        )
    }


    render() {
        let {handleSubmit, categories, locations, selectedCategories, weekdays, totalResult} = this.props
        const orderList = [{id: 1, text: this.context.t("order_by_time")}, {
            id: 2,
            text: this.context.t("order_by_view")
        }, {id: 3, text: this.context.t("order_by_register")}];
        const displayModes = [{id: 1, text: this.context.t("display_mode_full")}, {
            id: 2,
            text: this.context.t("display_mode_compress")
        }];
        return (
            <div className="row row-margin">
                <div className="margin-btm">
                    <div className="col-xs-12 col-sm-12">
                        <div className={"col-xs-12 col-sm-12 " + styles.courseFilter}>
                            <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
                                <div className={"col-md-12 " + styles.basicFilterBlock}>
                                    <div className={"col-md-3 " + styles.noPadRight}>
                                        <FormField formGroupId="key_word_filter" showLabel={false}
                                                   placeholder={this.context.t('search_course')}
                                                   formControlName="key_word" typeField="custom_input"></FormField>
                                    </div>
                                    {/* Title search */}
                                    <div className={"col-md-3 " + styles.noPadRight}>
                                        <FormField formGroupId="categories_id" showLabel={false}
                                                   options={categories.map((x) => {
                                                       return {text: x.name, id: x.id}
                                                   })}
                                                   placeholder={this.context.t('category')}
                                                   formControlName="filter_category_ids"
                                                   typeField="multi_select"></FormField>
                                    </div>
                                    {/* Field */}
                                    <div className={"col-md-3 " + styles.noPadRight}>
                                        <FormField formGroupId="locations_id" showLabel={false}
                                                   options={Object.keys(locations).map((x) => {
                                                       return {text: locations[x], id: x}
                                                   })}
                                                   placeholder={this.context.t("location")}
                                                   formControlName="filter_location_ids"
                                                   typeField="multi_select"></FormField>
                                    </div>
                                    {/* Area*/}
                                    <div className="col-md-1">
                                        <button type="submit"
                                                className={'btn btn-primary btn-secondary ' + styles.btnSearch}>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>

                                    <div className="col-md-2">
                                        <button type="button" className={'btn btn-primary ' + styles.btnAdvancedFilter}
                                                onClick={this.toggleFilter.bind(this)}>{this.context.t("filter")}</button>
                                    </div>
                                </div>
                                {/* Basic Filter Block */}
                                <br/>
                                <div className="clearfix"></div>

                                <div className="col-md-12">
                                    <div
                                        className={styles.advancedFilter + " collapse " + (this.state.openAdFilter ? "in" : "")}>
                                        <div className="col-md-3">
                                            <h4>{this.context.t('level')}</h4>
                                            {this.renderCourseLevels(selectedCategories)}
                                        </div>

                                        <div className="col-md-3">
                                            <h4>{this.context.t("day_of_week")}</h4>
                                            {this.renderDayOfWeek(weekdays)}
                                        </div>
                                        {/* Schedule days */}

                                        <div className="col-md-6 col-sm-6">
                                            <div className="row">
                                                {/* Tuition fee */}
                                                <div className="col-md-12 col-sm-12">
                                                    <h4>{this.context.t('tuition_fee_filter')}</h4>
                                                    {this.renderTutorFees(tuitionFees)}
                                                </div>
                                                {/* Schedule time */}
                                                <div className="col-md-12 col-sm-12">
                                                    <h4>{this.context.t('time_schedule')}</h4>
                                                    <div className='row dark-picker dark-picker-bright'>
                                                        <div className='col-sm-9'>
                                                            <FormField formGroupId="start_time_id" showLabel={false}
                                                                       placeholder={this.context.t("start_time")}
                                                                       formControlName="start_time"
                                                                       typeField="timePicker"></FormField>
                                                        </div>
                                                    </div>
                                                    <div className='row dark-picker dark-picker-bright margin-top15'>
                                                        <div className='col-sm-9'>
                                                            <FormField formGroupId="end_time_id" showLabel={false}
                                                                       placeholder={this.context.t("end_time")}
                                                                       formControlName="end_time"
                                                                       typeField="timePicker"></FormField>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="clearfix"></div>


                                    </div>
                                </div>
                                {/* Advanced Filter Block */}
                                <div className="clearfix"></div>
                                <hr/>

                                <div className={'col-md-12 ' + styles.filterResultBlock}>
                                    <div className="col-md-6">
                                        <i className="fa fa-list"></i> {this.context.t("total_result", {total: totalResult})}
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <FormField formGroupId="order_by_id" formLabel={this.context.t("order_list")}
                                                   options={orderList} formControlName="order_by"
                                                   typeField="custom_select"></FormField>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <FormField formGroupId="display_mode_id"
                                                   formLabel={this.context.t("display_mode")}
                                                   options={displayModes} formControlName="display_mode"
                                                   typeField="custom_select"></FormField>
                                    </div>
                                </div>
                                {/* Result Block */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CourseFilter.contextTypes = {
    t: React.PropTypes.func.isRequired
}

CourseFilter.propTypes = {
    categories: React.PropTypes.array.isRequired,
    searchCourse: React.PropTypes.func.isRequired,
    locations: React.PropTypes.object.isRequired,
    weekdays: React.PropTypes.object.isRequired,
};

export default cssModules(CourseFilter, styles);
