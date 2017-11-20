import React, {Component} from 'react';
import {Form} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './Course.module.scss';
import Select2 from 'react-select2-wrapper'
import {timeSlots, tuitionFees} from '../../constants/CourseFilter'
import FormField from "../Core/FormField";

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
            <div>
                {
                    selectedCategories.map((category) => {
                        <div key={category.id}>
                            <h5>{category.name}</h5>
                            {
                                category.course_levels.map((level) =>
                                    <div key={level.id}>
                                        <FormField formGroupId="filter_course_levels" showLabel={false} checked={this.props.selectedLevels.indexOf(level.id) >= 0}
                                                   onCheck={this.props.onSelectCourseLevel} formControlName="filter_course_levels" typeField="checkbox"></FormField>
                                        <label htmlFor=""><span><span></span></span>{level.name}</label>
                                    </div>
                                )
                            }
                        </div>
                    })
                }
            </div>
        )
    }

    renderDayOfWeek() {
        return (
            <div>
                {
                    Object.keys(weekdays).map((k) =>
                        <div key={k}>
                            <FormField formGroupId="filter_course_levels" showLabel={false} checked={this.props.selectedWeekdays.indexOf(k.id) >= 0} chosenValue={k}
                                       onCheck={this.props.onSelectWeekDay} formControlName="course_schedule_day" typeField="checkbox"></FormField>
                            <label htmlFor=""><span><span></span></span>{weekdays[k]}
                            </label>
                        </div>
                    )
                }
            </div>
        )
    }

    renderTutorFees(tuitionFees) {
        return (
            <div>
                {
                    tuitionFees.map((fee) =>
                        <div key={fee[0]}>
                            <FormField formGroupId="filter_fees" showLabel={false} chosenValue={fee[0]}
                                       onCheck={this.props.onFeeChange} formControlName="fees" typeField="checkbox"></FormField>
                            <label htmlFor=""><span><span></span></span>{fee[1]}</label>
                        </div>
                    )
                }
            </div>
        )
    }


    render() {
        let {categories, locations, selectedCategories, weekdays, totalResult} = this.props
        const orderList = [{id: 1, text: this.context.t("order_by_time")}, {id: 2, text: this.context.t("order_by_view")}, {id: 3, text: this.context.t("order_by_register")}];
        const displayModes = [{id: 1, text: this.context.t("display_mode_full")}, {id: 2, text: this.context.t("display_mode_compress")}];
        return (
            <div className="row row-margin">
                <div className="margin-btm">
                    <div className="col-xs-12 col-sm-12">
                        <div className={"col-xs-12 col-sm-12 " + styles.courseFilter}>
                            <Form action="#" id="filter_form" method="post">
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
                                                   placeholder={this.context.t('category')} formControlName="filter_category_ids"
                                                   typeField="multi_select"></FormField>
                                    </div>
                                    {/* Field */}
                                    <div className={"col-md-3 " + styles.noPadRight}>
                                        <FormField formGroupId="locations_id" showLabel={false}
                                                   options={Object.keys(locations).map((x) => {
                                                       return {text: locations[x], id: x}
                                                   })}
                                                   placeholder={this.context.t("location")} formControlName="filter_location_ids"
                                                   typeField="multi_select"></FormField>
                                    </div>
                                    {/* Area*/}
                                    <div className="col-md-1">
                                        <button type="submit" className={'btn btn-primary btn-secondary ' + styles.btnSearch}>
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
                                    <div className={styles.advancedFilter + " collapse " + (this.state.openAdFilter ? "in" : "")}>
                                        <div className="col-md-3">
                                            <h4>{this.context.t('level')}</h4>
                                            {this.renderCourseLevels(selectedCategories)}
                                        </div>

                                        <div className="col-md-3">
                                            <h4>{this.context.t("day_of_week")}</h4>
                                            {this.renderDayOfWeek()}
                                        </div>
                                        {/* Schedule days */}

                                        <div className="col-md-3">
                                            <h4>{this.context.t('tuition_fee_filter')}</h4>
                                            {this.renderTutorFees(tuitionFees)}
                                        </div>
                                        {/* Tuition fee */}

                                        <div className="col-md-3">
                                            <h4>{this.context.t('time_schedule')}</h4>
                                            <div className='row dark-picker dark-picker-bright'>
                                                <div className='col-sm-9'>
                                                    <FormField formGroupId="start_time_id" showLabel={false}
                                                               options={timeSlots.map((ts) => {
                                                                   return {id: ts[0], text: ts[1]}
                                                               })}
                                                               placeholder={this.context.t("start_time")} formControlName="start_time"
                                                               typeField="custom_select"></FormField>
                                                    <span
                                                        className={`input-errors ${this.props.startTimeError ? '' : 'hidden'}`}>{this.context.t('start_time_error')}</span>
                                                </div>
                                            </div>
                                            <div className='row dark-picker dark-picker-bright margin-top15'>
                                                <div className='col-sm-9'>
                                                    <FormField formGroupId="end_time_id" showLabel={false}
                                                               options={timeSlots.map((ts) => {
                                                                   return {id: ts[0], text: ts[1]}
                                                               })}
                                                               placeholder={this.context.t("end_time")} formControlName="end_time"
                                                               typeField="custom_select"></FormField>
                                                    <span
                                                        className={`input-errors ${this.props.endTimeError ? '' : 'hidden'}`}>{this.context.t('end_time_error')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Schedule time */}

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
                                        <FormField formGroupId="display_mode_id" formLabel={this.context.t("display_mode")}
                                                   options={displayModes} formControlName="display_mode"
                                                   typeField="custom_select"></FormField>
                                    </div>
                                </div>
                                {/* Result Block */}
                            </Form>
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
