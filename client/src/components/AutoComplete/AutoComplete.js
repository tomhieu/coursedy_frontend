import {Component} from "react";
import * as React from "react";
import FormField from "../Core/FormField";

class AutoComplete extends Component {
  render() {
    const {placeholder, label, showLabel, fieldName, fieldId} = this.props;
    return (
      <div>
        <FormField formGroupId={fieldId} showLabel={showLabel}
                   placeholder={placeholder}
                   formControlName={fieldName} typeField="custom_input"></FormField>
        <div>

        </div>
      </div>
    )
  }
}