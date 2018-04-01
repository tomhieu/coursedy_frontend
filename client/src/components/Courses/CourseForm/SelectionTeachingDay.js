import * as React from "react";
import {Component} from "react";
import SelectionTeachingDayEditMode from "./SelectionTeachingDayEditMode";
import SelectionTeachingDayViewMode from "./SelectionTeachingDayViewMode";
import {FormGroup} from "react-bootstrap";

class SelectionTeachingDay extends Component {
    constructor(props) {
        super(props);
    }

    onBlur() {
        console.log('on blur event');
    }

    render() {
        const {submitting, pristine, onEditTechingDay, activatedFieldIds, editTeachingDay} = this.props;
        if (!editTeachingDay) {
            return (
                <div onBlur={this.onBlur.bind(this)}>
                    <SelectionTeachingDayViewMode {...this.props}
                                                  onActivatedField={onEditTechingDay}
                                                  onClosedField={onEditTechingDay}>

                    </SelectionTeachingDayViewMode>
                </div>
            )
        } else {
            return (
                <div onBlur={this.onBlur.bind(this)}>
                    <SelectionTeachingDayEditMode {...this.props}>
                    </SelectionTeachingDayEditMode>
                    <div className="col-md-12 col-sm-12">
                        <FormGroup className="ml-15 mr-15 mt-10 d-flex justify-content-right">
                            <button type="submit" className="btn btn-primary mr-10" disabled={pristine || submitting}>
                                {this.context.t("save")}
                            </button>
                            <button type='button' onClick={() => onEditTechingDay()}
                                    className="btn btn-default btn-small margin-left-10 cancel-button">
                                {this.context.t("cancel")}
                            </button>
                        </FormGroup>
                    </div>
                </div>
            )
        }
    }
}

SelectionTeachingDay.contextTypes = {
    t: React.PropTypes.func.isRequired
}

export default SelectionTeachingDay