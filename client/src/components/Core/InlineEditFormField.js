import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FormGroup } from 'react-bootstrap';
import FormField from './FormField';
import PrimaryButton from './PrimaryButton/PrimaryButton';
import ReadOnlyField from './ReadOnlyField';

class InlineEditFormField extends FormField {
  constructor(props) {
    super(props);
    const { activated = false } = props;
    this.state = {
      editMode: activated
    };
  }

  componentWillReceiveProps(nextProps) {
    const { activated = false } = nextProps;
    this.setState({ editMode: activated });
  }

  showEditForm(activatedFieldIds) {
    this.setState({
      editMode: true
    });
    this.props.onActivatedField(activatedFieldIds);
  }

  closeEditForm(activatedFieldIds) {
    this.props.onClosedField(activatedFieldIds);
  }

  render() {
    const {
      submitting, pristine, showLabel = true, displayStyle = 'default-field',
      activatedFieldIds = [this.props.fieldId],
      isRichTextField = false, fieldLabel
    } = this.props;
    {
      if (this.state.editMode) {
        return (
          <div className={`${displayStyle} d-flex flex-vertical`}>
            {super.render()}
            <FormGroup className="d-flex justify-content-right">
              <PrimaryButton
                type="submit"
                line={false}
                disabled={pristine || submitting}
                isSmallButton
                title={this.context.t('save')}
              />
              <PrimaryButton
                type="button"
                isPrimary={false}
                customClasses="ml-15"
                callback={() => this.closeEditForm(activatedFieldIds)}
                isSmallButton
                title={this.context.t('cancel')}
              />
            </FormGroup>
          </div>
        );
      }
      return (
        <ReadOnlyField
          fieldLabel={fieldLabel}
          showLabel={showLabel}
          activatedFields={activatedFieldIds}
          displayStyle={displayStyle}
          content={this.props.content}
          isRichTextField={isRichTextField}
          showEditFormField={this.showEditForm.bind(this)}
        />

      );

      return (
        <ReadOnlyField
          fieldLabel={fieldLabel}
          showLabel={showLabel}
          activatedFields={activatedFieldIds}
          displayStyle={displayStyle}
          content={this.props.content}
          showEditFormField={this.showEditForm.bind(this)}
        />

      );
    }
  }
}

InlineEditFormField.contextTypes = {
  t: React.PropTypes.func.isRequired
};

InlineEditFormField.propTypes = {
  content: React.PropTypes.string.isRequired,
  fieldId: React.PropTypes.string.isRequired,
  fieldLabel: React.PropTypes.string.isRequired,
  activatedFieldIds: React.PropTypes.array,
  isRichTextField: React.PropTypes.bool
};

export default InlineEditFormField;
