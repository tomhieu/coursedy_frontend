import React, {Component} from 'react';
import * as Actions from '../../../actions/TutorProfileActionCreator'
import {fetchTutor} from "actions/TutorProfileActionCreator"
import InlineEditFormComponent from '../../Core/InlineEditFormField'
import cssModules from 'react-css-modules';
import styles from './TutorProfileDetails.module.scss';


class TutorProfileDetails extends Component {
  componentWillMount() {
    this.props.dispatch(Actions.fetchTutor())
  }

  render() {
    let {tutor} = this.props

    return (
      <div className=" content-section module row">
        <div className="col-sm-4 col-xs-12 single-teacher">
          <div className="shadow">
            <div className="clearfix"></div>
            <h3>{this.context.t('speciality')}</h3>
            <InlineEditFormComponent
              onSubmit={this.props.onUpdate}
              displayStyle='dart-text'
              content={tutor.speciality ? tutor.speciality : ''}
              name='speciality'
            />
            <h3>Availability</h3>
            <ul className="no-bullet">
              <li>Sunday - Saturday: Only Appointment</li>
              <li>Monday - Friday: 9:00 - 15:00</li>
            </ul>
          </div>
        </div>

        <div className="col-sm-8 col-xs-12 columns">
          <InlineEditFormComponent
            onSubmit={this.props.onUpdate}
            displayStyle=''
            dispplayComponent='h2'
            content={tutor.name ? tutor.name : ''}
            name='name'
          />

          <InlineEditFormComponent
            onSubmit={this.props.onUpdate}
            displayStyle='tutor-title dart-text inline-block'
            dispplayComponent='b'
            content={tutor.title ? tutor.title : ''}
            name='title'
          />

          <InlineEditFormComponent
            onSubmit={this.props.onUpdate}
            displayStyle=''
            dispplayComponent='p'
            editComponent='textarea'
            content={tutor.description ? tutor.description : ''}
            name='description'
          />

          <div className="appiontment-section">
            <h3>Expertise</h3>
            <label>Impressive Teaching Method</label>
            <div className="secondary progress" role="progressbar" aria-valuenow="25" aria-valuemin="0"
                 aria-valuetext="25 percent" aria-valuemax="100">
              <div className="progress-meter ninty-five"></div>
            </div>

            <label>Communication Skills</label>
            <div className="success progress">
              <div className="progress-meter eighty-five"></div>
            </div>

            <label>Experience</label>
            <div className="warning progress">
              <div className="progress-meter seventy-five"></div>
            </div>

            <label>Grooming</label>
            <div className="alert progress">
              <div className="progress-meter sixty-five"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TutorProfileDetails.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorProfileDetails.propTypes = {
  onUpdate: React.PropTypes.func.isRequired
};

export default cssModules(TutorProfileDetails, styles);
