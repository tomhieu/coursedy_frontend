import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import cssModules from 'react-css-modules';
import Select2 from 'react-select2-wrapper';
import styles from './TutorSearchForm.module.scss';

class TutorSearchForm extends Component {
  render() {
    return (
      <div className="margin-btm">
        <div className="row">
          <Form action="#" id="filter_form" method="post">
            <div className="col-md-4">
              <label>Course</label>
              <Select2
                className="select-picker"
                multiple
                data={[
                  { text: 'EAMCET (0)', id: 'eamcet' },
                  { text: 'C#(Sharp) (0)', id: 'c#' }
                ]}
              />
            </div>
            <div className="col-md-4">
              <label>Location</label>
              <Select2
                className="select-picker"
                multiple
                data={[
                  { text: 'Los Angeles (1)', id: 'los-angeles' },
                ]}
              />
            </div>
            <div className="col-md-4">
              <label>Teaching type</label>
              <Select2
                className="select-picker"
                multiple
                data={[
                  { text: 'Home (1)', id: 'home' },
                  { text: 'Online (0)', id: 'online' },
                ]}
              />
            </div>
          </Form>
        </div>
      </div>

    );
  }
}

TutorSearchForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorSearchForm.propTypes = {
  // content: PropTypes.string.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired
};

export default cssModules(TutorSearchForm, styles);
