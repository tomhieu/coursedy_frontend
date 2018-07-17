import * as React from "react";
import {Component} from "react";
import SelectionTeachingDayEditMode from "./SelectionTeachingDayEditMode";
import SelectionTeachingDayViewMode from "./SelectionTeachingDayViewMode";
import {FormGroup} from "react-bootstrap";
import PrimaryButton from "../../../Core/PrimaryButton/PrimaryButton";

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
                    <div className='row'>
                      <div className="col-md-12 col-sm-12">
                        <FormGroup className="mt-10 d-flex justify-content-right">
                          <PrimaryButton type="submit" line={false}
                                         disabled={pristine || submitting}
                                         isSmallButton={true}
                                         title={this.context.t("save")}>
                          </PrimaryButton>
                          <PrimaryButton type="button"
                                         isPrimary={false}
                                         customClasses="ml-15"
                                         callback={() => onEditTechingDay()}
                                         isSmallButton={true}
                                         title={this.context.t("cancel")}>
                          </PrimaryButton>
                        </FormGroup>
                      </div>
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