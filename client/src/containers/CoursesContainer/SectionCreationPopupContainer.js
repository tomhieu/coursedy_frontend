import * as React from "react";
import {Component} from "react";
import {reduxForm} from "redux-form";
import SectionCreationPopupComponent from "../../components/Courses/SectionCreationPopupComponent";
import {connect} from "react-redux";
import * as CourseActions from "../../actions/CourseFormActionCreator";
class SectionCreationPopupContainer extends Component {
    saveSection({id, title, name}) {
        this.props.dispatch(CourseActions.saveOrUpdateSection(id, title, name));
    }

    render() {
        const {showSectionPopup} = this.props;
        return (
            <SectionCreationPopupComponent show={showSectionPopup} handleSubmit={this.saveSection.bind(this)}></SectionCreationPopupComponent>
        )
    }
}

const mapStateToProps = (state) => {
    const {CourseFormComponent} = state;
    const {showSectionPopup} = CourseFormComponent;

    return {
        showSectionPopup
    };
};

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'sectionCreationForm',
    fields: ['name', 'title'],
    validate
})(SectionCreationPopupContainer));