import {Component} from "react";
import * as React from "react";
import InlineEditFormField from "../../../components/Core/InlineEditFormField";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";

class SectionDetailContainer extends Component {

    render() {
        const {handleSubmit, section} = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)} className='inline-form' multiple={true}>
                <InlineEditFormField activated={this.props.activatedField === "sectionTitleId_" + section.id}
                                     fieldId={"sectionTitleId_" + section.id}
                                     showLabel={false}
                                     fieldLabel={this.context.t("section_title")}
                                     placeholder={this.context.t("section_title")}
                                     content={section.title}
                                     isMandatoryField={true}
                                     formControlName="title"
                                     typeField="custom_input"
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

const mapStateToProps = (state) => {
    const {courseDetails} = state;
    const {editMode} = courseDetails;

    return {editMode};
};

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'SectionDetailForm',
    fields: ['title'],
    enableReinitialize: true
})(SectionDetailContainer));