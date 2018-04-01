import * as React from "react";
import {Component} from "react";
import SelectionTeachingDayEditMode from "./SelectionTeachingDayEditMode";
import SelectionTeachingDayViewMode from "./SelectionTeachingDayViewMode";

class SelectionTeachingDay extends Component {
  constructor(props) {
    super(props);
    this.state = {editable: props.editMode}
  }
  onEditTechingDay() {
    const currentState = this.state.editable;
    this.setState({editable: !currentState});
  }
  render() {
    if (this.state.editable) {
      return (
        <SelectionTeachingDayViewMode {...this.props} onEditTechingDay={this.onEditTechingDay.bind(this)}></SelectionTeachingDayViewMode>
      )
    } else {
      return (
        <SelectionTeachingDayEditMode {...this.props}></SelectionTeachingDayEditMode>
      )
    }
  }
}

export default SelectionTeachingDay