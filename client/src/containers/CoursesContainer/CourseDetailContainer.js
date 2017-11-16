import {Component} from "react";
import * as React from "react";
import CourseForm from "../../components/Courses/CourseForm";
import * as CourseActions from "../../actions/CourseFormActionCreator";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {validate} from "../../validations/CourseFormValidation"

class CourseDetailContainer extends Component {
    constructor(props) {
        super(props);
        // store the image preview url. Retrieve from the DropZone(onDrop) or the redux store
        this.coverImage = this.props.cover_image;
    }

    createCourse({title, description, category_id, course_level_id, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency}) {
        this.props.dispatch(CourseActions.createCourse(title, description, category_id, course_level_id, start_date, end_date, number_of_students,
            period, period_type, tuition_fee, currency, this.coverImage));
    }

    onDropCoverImage(data) {
        this.coverImage = data;
    }

    render() {
        const {editMode, courseData} = this.props;
        return (
            <div>
                <CourseForm onSubmit={this.createCourse.bind(this)} onDropCoverImage={this.onDropCoverImage.bind(this)}
                            editMode={editMode} courseData={courseData} courseId={this.courseId} {...this.props}/>
            </div>
        )
    }
}

CourseDetailContainer.contextTypes = {
    t: React.PropTypes.func.isRequired,
    router: React.PropTypes.object
};

CourseDetailContainer.propTypes = {};

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
    const {courseData, editMode, activatedField} = CourseFormComponent;
    const {categories} = CourseFilter;
    // retrieve the preview image url from redux store when user navigate back.
    const {cover_image} = courseData;

    return {
        courseCreationForm, courseData, cover_image, categories, editMode,
        initialValues: activatedField != null ? courseData : {},
        course_levels: editMode ? getCourseLevelFromCategory(categories, courseData.category_id) :
            courseCreationForm != undefined ? getCourseLevelFromCategory(categories, Number(courseCreationForm.values.category_id)) : []
    };
};

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'courseCreationForm',
    fields: ['title', 'description', 'start_date', 'end_date', 'number_of_students', 'period', 'period_type', 'tuition_fee', 'currency', 'cover_image', 'category_id', 'course_level_id'],
    validate,
    enableReinitialize: true
})(CourseDetailContainer));