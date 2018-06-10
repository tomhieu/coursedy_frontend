import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {FormGroup} from "react-bootstrap";
import FormField from "./FormField";
import PrimaryButton from "./PrimaryButton/PrimaryButton";

class InlineEditFormField extends FormField {
  constructor(props) {
    super(props);
    const {activated = false} = props;
    this.state = {
      editMode: activated
    }
  }

  componentWillReceiveProps(nextProps) {
    const {activated = false} = nextProps;
    this.setState({editMode: activated});
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
    const { submitting, pristine, showLabel = true, displayStyle = "default-field",
          activatedFieldIds = [this.props.fieldId],
          onlyShowWhenEdit = false, fieldLabel } = this.props;
    {
      if (this.state.editMode) {
        return (
          <div className={displayStyle + " d-flex flex-vertical"}>
            {super.render()}
            <FormGroup className="d-flex justify-content-right">
              <PrimaryButton type="submit" line={false}
                             disabled={pristine || submitting}
                             title={this.context.t("save")}>
              </PrimaryButton>
              <PrimaryButton type="button"
                             isPrimary={false}
                             customClasses="ml-15"
                             callback={() => this.closeEditForm(activatedFieldIds)}
                             title={this.context.t("cancel")}>
              </PrimaryButton>
            </FormGroup>
          </div>
        )
      } else {
        return (
          <div className={displayStyle + ' inline-field d-flex flex-horizontal'}>
            {showLabel && fieldLabel !== undefined && fieldLabel !== '' ? (<label className="control-label">{fieldLabel}: </label>) : ''}
            <label className='pre-wrap'>{this.props.content}</label>
            <span className='inline-edit' onClick={() => this.showEditForm(activatedFieldIds)}>
              <i className="fa fa-pencil"></i>
            </span>
          </div>
        )
      }
    }
  }
}

InlineEditFormField.contextTypes = {
  t: React.PropTypes.func.isRequired
}

InlineEditFormField.propTypes = {
  content: React.PropTypes.string.isRequired,
  fieldId: React.PropTypes.string.isRequired,
  fieldLabel: React.PropTypes.string.isRequired,
  activatedFieldIds: React.PropTypes.array
}

export default InlineEditFormField;