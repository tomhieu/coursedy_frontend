import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {FormGroup} from "react-bootstrap";
import FormField from "./FormField";

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
          onlyShowWhenEdit = false } = this.props;
    {
      if (this.state.editMode) {
        return (
          <div className={displayStyle + " d-flex flex-vertical"}>
            {super.render()}
            <FormGroup className="ml-15 mr-15 mt-10 d-flex justify-content-right">
              <button type="submit" className="btn btn-primary mr-10" disabled={pristine || submitting}>
                {this.context.t("save")}
              </button>
              <button type='button' onClick={() => this.closeEditForm(activatedFieldIds)}
                      className="btn btn-default btn-small margin-left-10 cancel-button">
                {this.context.t("cancel")}
              </button>
            </FormGroup>
          </div>
        )
      } else {
        return (
          <div className={displayStyle + ' inline-field d-flex flex-horizontal'}>
            {showLabel ? (<label className="control-label">{this.props.fieldLabel}: </label>) : ''}
            <span className='pre-wrap'>{this.props.content}</span>
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