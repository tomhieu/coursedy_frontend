import * as React from "react";
import {Component} from "react";
import LessonLineComponent from "../../components/Courses/LessonLineComponent";
import {connect} from "react-redux";
import cssModules from "react-css-modules";
import styles from "./ListLesson.module.scss";
import {addLesson, deleteLesson, editLessonDetail, saveCourseAndLesson} from "../../actions/CourseFormActionCreator";
import {reduxForm} from "redux-form";
import {Link} from "react-router-dom";
class ListLessonContainer extends Component {
    constructor(props) {
        super(props);
    }

    editLessonDetail(lessonId) {
        this.props.dispatch(editLessonDetail(lessonId));
    }

    addNewLesson() {
        this.props.dispatch(addLesson());
    }

    deleteNewLesson(lessonId) {
        this.props.dispatch(deleteLesson(lessonId));
    }

    saveCourseWithLesson() {
        this.props.dispatch(saveCourseAndLesson({
            title: this.props.title,
            description: this.props.description,
            start_date: this.props.start_date,
            end_date: this.props.end_date,
            number_of_students: this.props.number_of_students,
            period: this.props.period,
            period_type: this.props.period_type,
            tuition_fee: this.props.tuition_fee,
            currency: this.props.currency,
            cover_image: this.props.cover_image,
            lessonList: this.props.lessonList
        }))
    }

    render() {
        const { lessonList } = this.props;
        return (
            <div className="d-flex flex-vertical">
                <div className="d-flex flex-auto">
                    <button className="btn btn-primary" onClick={this.addNewLesson.bind(this)}>{this.context.t('lesson_add_more')}</button>
                </div>
                <div className="d-flex flex-horizontal flex-wrap mt-20 ">
                    <div className="index-lesson-col lesson-col-no-text">
                    </div>
                    <div className="lesson-name-col lesson-col-text">
                        <span>{this.context.t('lesson_name')}</span>
                    </div>
                    <div className="lesson-per-col lesson-col-text">
                        <span>{this.context.t('lesson_period')}</span>
                    </div>
                    <div className="lesson-del-col lesson-col-no-text">
                    </div>
                    <div className="lesson-add-col lesson-col-no-text">
                    </div>
                </div>
                {
                    lessonList.map((lesson) =>
                        <div key={lesson.posId}>
                            <LessonLineComponent lesson={lesson} showPopupEdit={lesson.showPopupEdit} onDeleteLesson={this.deleteNewLesson.bind(this)}
                                                  editLessonDetail={this.editLessonDetail.bind(this)} {...this.props}/>
                        </div>
                    )
                }

                <div className="d-flex flex-horizontal">
                    <Link to="/dashboard/courses/new" className="btn btn-link-dark signin-btn mr-10">{this.context.t('course_modification')}</Link>
                    {lessonList.length > 0 ?
                        <button type="button" className="btn btn-primary btn-link-dark signin-btn" onClick={this.saveCourseWithLesson.bind(this)}>
                        {this.context.t("save_course")}
                        </button>
                        : null
                    }
                </div>

            </div>
        )
    }
}

ListLessonContainer.contextTypes = {
    t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { CourseFormComponent } = state;
    const { lessonCreationForm, courseData } = CourseFormComponent;
    const { title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image } = courseData;
    const { lessonList, activeLesson } = lessonCreationForm;
    return {
        title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image,
        lessonList,
        activeLesson
    }
};

export default connect(mapStateToProps)(reduxForm({
    form: 'lessonDetailForm',
    fields: ['lessonName', 'lessonPeriod', 'lessonDocument', 'lessonDesciption']
})(cssModules(ListLessonContainer, styles)));
