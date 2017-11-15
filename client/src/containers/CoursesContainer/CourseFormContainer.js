import React, {Component} from "react";
import {CourseForm} from "../../components/index";
import * as CourseActions from "../../actions/CourseFormActionCreator";
import * as FilterActions from "../../actions/CourseFilterActionCreator";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {validate} from "../../validations/CourseFormValidation";
import SectionCreationPopupContainer from "./SectionCreationPopupContainer";
import SectionDetailContainer from "./SectionDetailContainer";

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
            this.props.dispatch(CourseActions.loadCourseDetail(this.courseId));
        }
    }

    createCourse({title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency}) {
        this.props.dispatch(CourseActions.createCourse(title, description, category_id, course_level_id, start_date, end_date, number_of_students,
            period, period_type, tuition_fee, currency, this.coverImage, this.props.lessonList));
    }

    addNewSection() {
        this.props.dispatch(CourseActions.addNewSection());
    }

    saveSection({id, title}) {
        this.props.dispatch(CourseActions.saveOrUpdateSection(id, title));
    }

    deleteSection(id) {
        this.props.dispatch(CourseActions.deleteSection(id));
    }

    onDropCoverImage(data) {
        this.coverImage = data;
    }

    render() {
        const {editMode, listSection, courseData} = this.props;
        return (
            <div className="row dashboard-panel">
                <div className="col-sm-12 col-md-12">
                    <CourseForm onSubmit={this.createCourse.bind(this)} addSection={this.addNewSection.bind(this)}
                                onDropCoverImage={this.onDropCoverImage.bind(this)} editMode={editMode} courseData={courseData}
                                courseId={this.courseId} {...this.props}/>
                </div>
                {
                    editMode ? (
                        <div className="col-sm-12 col-md-12">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <a className="align-self-center" onClick={this.addNewSection.bind(this)}>{this.context.t('lesson_link_edit')}</a>
                                </div>
                                <div className="col-sm-12 col-md-12">
                                    {
                                        listSection.map((section) =>
                                            <SectionDetailContainer section={section} onSubmit={this.saveSection.bind(this)}
                                                                    onDeleteSection={this.deleteSection.bind(this)} showPopupEdit={section.showLessonPopup}>
                                            </SectionDetailContainer>)
                                    }
                                </div>
                                <SectionCreationPopupContainer courseId={courseData.id}></SectionCreationPopupContainer>
                            </div>
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
    const {CourseFormComponent, CourseFilter, form} = state;
    const {courseCreationForm} = form;
    const {listSection, courseData, editMode} = CourseFormComponent;
    const {categories} = CourseFilter;
    // retrieve the preview image url from redux store when user navigate back.
    const {cover_image} = courseData;

    return {
        courseCreationForm, listSection, courseData, cover_image, categories, editMode,
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
