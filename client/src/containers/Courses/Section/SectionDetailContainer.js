import * as React from "react";
import {Component} from "react";
import InlineEditFormField from "../../../components/Core/InlineEditFormField";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import * as CourseActions from "actions/CourseFormActionCreator";

class SectionDetailContainer extends Component {
  onClosedField(fieldIds) {
    this.props.reset();
    this.props.dispatch(CourseActions.closedEditField(fieldIds));
  }

    render() {
        const {handleSubmit, section} = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
                <InlineEditFormField activated={this.props.activatedField.indexOf("sectionTitleId_" + section.id) >= 0}
                                     fieldId={"sectionTitleId_" + section.id}
                                     showLabel={false}
                                     fieldLabel={this.context.t("section_title")}
                                     placeholder={this.context.t("section_title")}
                                     content={section.title}
                                     isMandatoryField={true}
                                     formControlName="title"
                                     typeField="custom_input"
                                     onClosedField={this.onClosedField.bind(this)}
                                     {...this.props}>
                </InlineEditFormField>
            </form>
        )
    }
}

SectionDetailContainer.contextTypes = {
    t: React.PropTypes.func.isRequired,
    router: React.PropTypes.object
};

const mapStateToProps = (state, props) => {
    const {courseDetails} = state;
    const {editMode} = courseDetails;


    return {editMode, initialValues: {title: props.section.title}};
};

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'SectionDetailForm',
    fields: ['title'],
    enableReinitialize: true
})(SectionDetailContainer));