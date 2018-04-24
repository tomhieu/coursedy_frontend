import * as React from "react";
import {Component} from "react";

class TutorEducationItem extends Component {
  render() {
    let {education} = this.props;

    return (
      <div className='row'>
        <div className='col-sm-12'>
          <div style={{fontSize: '16px'}}><b>{education.title}</b></div>
          <div><span className='yellow-color'>{education.graduated_from}</span> <span> - {education.start_date} - {education.end_date} </span></div>
          <div>{education.description}</div>
        </div>
      </div>
    )
  }
}

TutorEducationItem.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorEducationItem.propTypes = {
  education: React.PropTypes.object.isRequired
}

export default TutorEducationItem