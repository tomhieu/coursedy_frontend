import React, {Component} from "react";
import {CourseForm} from "../../components/index";
import * as CourseActions from "../../actions/CourseFormActionCreator";
import * as FilterActions from "../../actions/CourseFilterActionCreator";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {validate} from "../../validations/CourseFormValidation";
import SectionDetailComponent from "../../components/Courses/SectionDetailComponent";
import SectionCreationPopupContainer from "./SectionCreationPopupContainer";

class CourseFormContainer extends Component {
    constructor(props) {
        super(props);
        // store the image preview url. Retrieve from the DropZone(onDrop) or the redux store
        this.coverImage = this.props.cover_image;
        this.courseId = this.props.match.params.id;
    }

    componentWillMount() {
        this.props.dispatch(FilterActions.fetchCategories())
        if (this.courseId) {
            this.props.dispatch(loadCourseDetail(this.courseId));
        }
    }

    createCourse({title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency}) {
        this.props.dispatch(createCourse(title, description, category_id, course_level_id, start_date, end_date, number_of_students,
            period, period_type, tuition_fee, currency, this.coverImage, this.props.lessonList));
    }

    addLesson() {
        this.props.dispatch(addAndModifyLessonCourse(Object.assign({}, this.props.courseCreationForm, {cover_image: this.coverImage}),
            this.props.lessonList));
        this.context.router.history.push("/dashboard/courses/list-lesson");
    }

    saveSection({id, title, name}) {
        this.props.dispatch(CourseActions.saveOrUpdateSection(id, title, name));
    }

    deleteSection(id) {
        this.props.dispatch(CourseActions.deleteSection(id));
    }

    onDropCoverImage(data) {
        this.coverImage = data;
    }

    render() {
        const {editMode, listSection} = this.props;
        return (
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <CourseForm onSubmit={this.createCourse.bind(this)} addSection={this.addLesson.bind(this)}
                                onDropCoverImage={this.onDropCoverImage.bind(this)} editMode={editMode}
                                courseId={this.courseId} {...this.props}/>
                </div>
                {
                    editMode ? (
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <a className="align-self-center" onClick={() => CourseActions.addNewSection()}>{this.context.t('lesson_link_edit')}</a>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                {
                                    listSection.map((section) => <SectionDetailComponent section={section} addLesson={this.addLesson.bind(this)} handleSubmit={this.saveSection.bind(this)}
                                    onDeleteSection={this.deleteSection.bind(this)} showPopupEdit={false}></SectionDetailComponent>)
                                }
                            </div>
                            <SectionCreationPopupContainer></SectionCreationPopupContainer>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

CourseFormContainer.contextTypes = {
    t: React.PropTypes.func.isRequired,
    router: React.PropTypes.object
};

CourseFormContainer.propTypes = {};

const getCourseLevelFromCategory = (categories, selectedCategoryId) => {
    const [selectedCategory = {course_levels: []}] = categories.filter((category) => {
        return selectedCategoryId === category.id;
    });

    return selectedCategory.course_levels.map((level) => {
        return {id: level.id, text: level.name}
    });
}

const mapStateToProps = (state) => {
    const {CourseFormComponent, CourseSection, CourseFilter, editMode, form} = state;
    const {courseCreationForm} = form;
    const {listSection, courseData} = CourseFormComponent;
    const {categories} = CourseFilter;
    // retrieve the preview image url from redux store when user navigate back.
    const {cover_image} = courseData;

    return {
        courseCreationForm, listSection, cover_image, categories, editMode,
        initialValues: courseData,
        course_levels: courseCreationForm != undefined ? getCourseLevelFromCategory(categories, Number(courseCreationForm.values.category_id)) : []
    };
};

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'courseCreationForm',
    fields: ['title', 'description', 'start_date', 'end_date', 'number_of_students', 'period', 'period_type', 'tuition_fee', 'currency', 'cover_image', 'category_id', 'course_level_id'],
    validate,
    enableReinitialize: true
})(CourseFormContainer));
