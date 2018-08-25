import * as React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as CourseActions from '../../../actions/CourseFormActionCreator';
import FormField from '../../../components/Core/FormField';
import FormDialogComponent from '../../Dialog/FormDialogContainer';
import { validate } from '../../../validations/SectionFormValidator';

class SectionCreationPopupContainer extends Component {
  render() {
    const { handleSubmit, showSectionPopup } = this.props;
    return (
      <FormDialogComponent
        show={showSectionPopup}
        title={this.context.t('lesson_popup_edit_title')}
        formName="sectionCreationForm"
        cancelCallback={() => this.props.dispatch(CourseActions.closePopupSection())}
        {...this.props}
      >
        <form
          onSubmit={handleSubmit(this.props.onSubmit)}
          className="inline-form"
          multiple
        >
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <FormField
                fieldId="sectionTitleId"
                fieldLabel={this.context.t('section_title')}
                placeholder={this.context.t('section_title')}
                isMandatoryField
                formControlName="title"
                typeField="custom_input"
              />
            </div>
          </div>
        </form>
      </FormDialogComponent>
    );
  }
}

SectionCreationPopupContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { courseDetails } = state;
  const { showSectionPopup } = courseDetails;

  return {
    showSectionPopup,
    initialValues: {}
  };
};

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'sectionCreationForm',
  validate,
})(SectionCreationPopupContainer));
