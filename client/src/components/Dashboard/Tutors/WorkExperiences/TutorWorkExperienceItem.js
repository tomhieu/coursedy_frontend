import * as React from 'react';
import { Component } from 'react';
import DeleteIcon from 'components/Common/DeleteIcon';

class TutorWorkExperienceItem extends Component {
  delete() {
    const workExperience = this.props.workExperience;
    this.props.delete(workExperience.tutor_id, workExperience.id);
  }

  render() {
    const { workExperience } = this.props;

    return (
      <div className="row">
        <div className="col-sm-10">
          <div style={{ fontSize: '16px' }}><b>{workExperience.title}</b></div>
          <div>
            <span className="yellow-color">{workExperience.company}</span>
            <span>
              {' '}
-
              {workExperience.start_date}
              {' '}
-
              {workExperience.end_date}
              {' '}

            </span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: workExperience.description }} />
        </div>
        <div className="col-sm-2 text-right">
          <span className="mr-10 inline-edit" onClick={(e) => { this.props.showEditWorkExperienceForm(workExperience.id); }}><i className="fa fa-pencil" /></span>
          <DeleteIcon
            action={this.delete.bind(this)}
            comfirmationMessage={this.context.t('delete_work_experience_confirmation_message')}
            comfirmationTitle={this.context.t('confirm_delete_header')}
          />
        </div>
      </div>
    );
  }
}

TutorWorkExperienceItem.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorWorkExperienceItem.propTypes = {
  workExperience: React.PropTypes.object.isRequired,
  showEditWorkExperienceForm: React.PropTypes.func.isRequired,
  delete: React.PropTypes.func.required
};

export default TutorWorkExperienceItem;
