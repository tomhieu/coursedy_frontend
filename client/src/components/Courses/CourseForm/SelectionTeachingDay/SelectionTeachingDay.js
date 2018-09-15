import * as React from 'react';
import { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import SelectionTeachingDayEditMode from './SelectionTeachingDayEditMode';
import SelectionTeachingDayViewMode from './SelectionTeachingDayViewMode';
import PrimaryButton from '../../../Core/PrimaryButton/PrimaryButton';

class SelectionTeachingDay extends Component {
  constructor(props) {
    super(props);
  }

  onBlur() {
    console.log('on blur event');
  }

  render() {
    const {
      submitting, pristine, onEditTechingDay, canEditable, editTeachingDay
    } = this.props;
    if (!editTeachingDay) {
      return (
        <div onBlur={this.onBlur.bind(this)}>
          <SelectionTeachingDayViewMode
            {...this.props}
            onActivatedField={onEditTechingDay}
            onClosedField={onEditTechingDay}
            canEditable={canEditable}
          />
        </div>
      );
    }
    return (
      <div onBlur={this.onBlur.bind(this)}>
        <SelectionTeachingDayEditMode {...this.props} />
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <FormGroup className="mt-10 d-flex justify-content-right">
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
                callback={() => onEditTechingDay()}
                isSmallButton
                title={this.context.t('cancel')}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

SelectionTeachingDay.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default SelectionTeachingDay;
