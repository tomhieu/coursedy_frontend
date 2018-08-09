import * as React from "react";
import {Component} from "react";
import InlineEditFormField from "../../../components/Core/InlineEditFormField";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import * as CourseActions from "actions/CourseFormActionCreator";
import {validate} from "../../../validations/SectionFormValidator";

class SectionDetailContainer extends Component {
  onClosedField(fieldIds) {
    this.props.reset();
    this.props.dispatch(CourseActions.closedEditField(fieldIds));
  }

    render() {
        const {handleSubmit, section, activatedField = []} = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
                <InlineEditFormField activated={activatedField.indexOf("sectionTitleId_" + section.id) >= 0}
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

const isActivatedFieldOfSection = (activatedFields, section) => {
  if (!Array.isArray(activatedFields) || activatedFields.length === 0) {
    return false;
  }
  return activatedFields.filter((field) => field.indexOf("sectionTitleId_" + section.id) >= 0).length > 0;
}

const mapStateToProps = (state, props) => {
    const {courseDetails} = state;
    const {editMode} = courseDetails;
    const hasActivatedField = isActivatedFieldOfSection(props.activatedField, props.section);
    return {editMode, initialValues: hasActivatedField === true ? props.section : {}};
};

export default connect(
    mapStateToProps
)(reduxForm({
    fields: ['title'],
    validate,
    enableReinitialize: true
})(SectionDetailContainer));