import {Component} from "react";
import * as React from "react";
import {ControlLabel, FormGroup} from "react-bootstrap";
import {Field} from "redux-form";
import {renderSingleFileInput} from "../../Core/CustomComponents";
import FormField from "../../Core/FormField";

export class TutorEducationForm extends Component {
  render() {
    const {onSubmit, listLevel, degrees, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField formControlName="title" typeField='custom_input'/>
        <FormField formControlName="graduated_from" typeField='custom_input'/>
        <FormField formControlName="start_date" typeField='datepicker'/>
        <FormField formControlName="end_date" typeField='datepicker'/>
        <FormField formControlName="description" typeField='custom_textarea'/>
      </form>
    )
  }
}

TutorEducationForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorEducationForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}