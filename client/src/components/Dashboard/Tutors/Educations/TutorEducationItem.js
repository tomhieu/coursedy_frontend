import * as React from "react";
import {Component} from "react";
import DeleteIcon from "components/Common/DeleteIcon";

class TutorEducationItem extends Component {
  delete() {
    let education = this.props.education
    this.props.delete(education.tutor_id, education.id)
  }

  render() {
    let {education} = this.props;

    return (
      <div className='row'>
        <div className='col-sm-10'>
          <div style={{fontSize: '16px'}}><b>{education.title}</b></div>
          <div><span className='yellow-color'>{education.graduated_from}</span>
            <span> - {education.start_date} - {education.end_date} </span></div>
          <div>{education.description}</div>
        </div>
        <div className='col-sm-2 text-right'>
          <DeleteIcon action={this.delete.bind(this)}
                      comfirmationMessage={this.context.t('delete_education_confirmation_message')}
                      comfirmationTitle={this.context.t('confirm_delete_header')}/>
        </div>
      </div>
    )
  }
}

TutorEducationItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorEducationItem.propTypes = {
  education: React.PropTypes.object.isRequired,
  delete: React.PropTypes.func.required
}

export default TutorEducationItem