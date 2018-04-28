import * as React from "react";
import {Component} from "react";
import TutorEducationItem from "./TutorEducationItem";
import EditEducationFormContainer from 'containers/Dashboard/Tutors/Educations/EditEducationFormContainer'

class TutorEducationList extends Component {
  render() {
    let {educations, currentEducation} = this.props;

    return (
      <div>
        {
          educations.map(e => (
            <div key={e.id} className='mb-20'>
              {
                currentEducation && currentEducation.id == e.id ? (<div className='bordered-box'><EditEducationFormContainer/></div>) :
                  (<TutorEducationItem education={e} delete={this.props.deleteItem}
                                       showEditEducationForm={this.props.showEditEducationForm}/>)
              }
              <hr/>
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
  educations: React.PropTypes.array.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  showEditEducationForm: React.PropTypes.func.isRequired,
  currentEducation: React.PropTypes.object
}

export default TutorEducationList