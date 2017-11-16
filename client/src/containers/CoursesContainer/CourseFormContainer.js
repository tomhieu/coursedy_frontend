import React, {Component} from "react";
import {CourseForm} from "../../components/index";
import * as CourseActions from "../../actions/CourseFormActionCreator";
import * as FilterActions from "../../actions/CourseFilterActionCreator";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {validate} from "../../validations/CourseFormValidation";
import SectionCreationPopupContainer from "./SectionCreationPopupContainer";
import SectionDetailContainer from "./SectionDetailContainer";
import {btnStyles} from "../../utils/CustomStylesUtil";
import {FlatButton, IconButton} from "material-ui";
import {ContentAddCircle} from "material-ui/svg-icons/index";
import {red900} from "material-ui/styles/colors";

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

    onActivatedField(fieldId) {
        this.props.dispatch(CourseActions.activatedEditField(fieldId));
    }

    onClosedField(fieldId) {
        this.props.dispatch(CourseActions.closedEditField(fieldId));
    }

    render() {
        const {editMode, listSection, courseData, activatedField} = this.props;
        return (
            <div className="row dashboard-panel">
                <div className="col-sm-12 col-md-12">
                    <CourseForm onSubmit={this.createCourse.bind(this)} addSection={this.addNewSection.bind(this)} onActivatedField={this.onActivatedField.bind(this)}
                                onDropCoverImage={this.onDropCoverImage.bind(this)} editMode={editMode} courseData={courseData}
                                onClosedField={this.onClosedField.bind(this)} courseId={this.courseId} {...this.props}/>
                </div>
                {
                    editMode ? (
                        <div className="col-sm-12 col-md-12">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <FlatButton label={this.context.t('lesson_link_edit')} style={btnStyles.defaultFlatBtn}
                                        secondary={true} onClick={this.addNewSection.bind(this)}
                                        icon={<ContentAddCircle color={red900} />}
                                    />
                                </div>
                                <div className="col-sm-12 col-md-12">
                                    {
                                        listSection.map((section) =>
                                            <SectionDetailContainer section={section} onSubmit={this.saveSection.bind(this)} key={section.id}
                                                                    onDeleteSection={this.deleteSection.bind(this)} showPopupEdit={section.showLessonPopup} {...this.props}
                                                                    onActivatedField={this.onActivatedField.bind(this)} onClosedField={this.onClosedField.bind(this)}
                                                                    initialValues={activatedField === "sectionTitleId_" + section.id ? {title: section.title} : {}}
                                            >
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
    const {listSection, courseData, editMode, activatedField} = CourseFormComponent;
    const {categories} = CourseFilter;
    // retrieve the preview image url from redux store when user navigate back.
    const {cover_image} = courseData;

    return {
        courseCreationForm, listSection, courseData, cover_image, categories, editMode, activatedField,
        initialValues: activatedField != null ? courseData : {},
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
