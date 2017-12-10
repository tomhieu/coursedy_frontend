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

  showEditForm(fieldId) {
    this.setState({
      editMode: true
    });
    this.props.onActivatedField(fieldId);
  }

  closeEditForm(fieldId) {
    this.props.onClosedField(fieldId);
  }

  render() {
    const {submitting, pristine, showLabel = true, displayStyle = "default-field"} = this.props;
    {
      if (this.state.editMode) {
        return (
          <div className={displayStyle + " d-flex flex-vertical"}>
            {super.render()}
            <FormGroup className="ml-15 mr-15 mt-10 d-flex justify-content-right">
              <button type="submit" className="btn btn-primary mr-10" disabled={pristine || submitting}>
                {this.context.t("save")}
              </button>
              <button type='button' onClick={this.closeEditForm.bind(this)}
                      className="btn btn-default btn-small margin-left-10 cancel-button">
                {this.context.t("cancel")}
              </button>
            </FormGroup>
          </div>
        )
      } else {
        return (
          <div className={displayStyle + ' inline-field d-flex flex-horizontal'}>
            {showLabel ? (<label className="control-label">{this.props.formLabel}: </label>) : ''}
            <span className='pre-wrap'>{this.props.content}</span>
            <span className='inline-edit' onClick={() => this.showEditForm(this.props.formGroupId)}><i
              className="fa fa-pencil"></i></span>
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
  content: React.PropTypes.string.isRequired
}

export default InlineEditFormField;