import * as React from "react";
import {Component} from "react";
import TutorEducationItem from "./TutorEducationItem";

class TutorEducationList extends Component {
  render() {
    let {educations} = this.props;

    return (
      <div>
        {
          educations.map(e => (
            <div key={e.id} className='mb-20'>
              <TutorEducationItem education={e}/>
            </div>
          ))
        }
      </div>
    )
  }
}

TutorEducationList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorEducationList.propTypes = {
  educations: React.PropTypes.array.isRequired
}

export default TutorEducationList