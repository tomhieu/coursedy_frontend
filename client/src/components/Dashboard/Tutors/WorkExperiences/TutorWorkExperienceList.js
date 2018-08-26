import * as React from 'react';
import { Component } from 'react';
import EditWorkExperienceFormContainer from 'containers/Dashboard/Tutors/WorkExperiences/EditWorkExperienceFormContainer';
import TutorWorkExperienceItem from 'components/Dashboard/Tutors/WorkExperiences/TutorWorkExperienceItem';

class TutorWorkExperienceList extends Component {
  render() {
    const { workExperiences, currentWorkExperience } = this.props;

    return (
      <div>
        {
          workExperiences.map(w => (
            <div key={w.id} className="mb-20">
              {
                currentWorkExperience && currentWorkExperience.id == w.id ? (<div className="bordered-box"><EditWorkExperienceFormContainer /></div>)
                  : (
                    <TutorWorkExperienceItem
                      workExperience={w}
                      delete={this.props.deleteItem}
                      showEditWorkExperienceForm={this.props.showEditWorkExperienceForm}
                    />
                  )
              }
            </div>
          ))
        }
      </div>
    );
  }
}

TutorWorkExperienceList.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorWorkExperienceList.propTypes = {
  workExperiences: React.PropTypes.array.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  showEditWorkExperienceForm: React.PropTypes.func.isRequired,
  currentWorkExperience: React.PropTypes.object
};

export default TutorWorkExperienceList;
