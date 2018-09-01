import * as React from 'react';
import { Component } from 'react';
import TutorWorkExperienceList from 'components/Dashboard/Tutors/WorkExperiences/TutorWorkExperienceList';
import { connect } from 'react-redux';
import * as actions from 'actions/DashboarTutorWorkExperienceListActionCreator';
import NewWorkExperienceFormContainer from './NewWorkExperienceFormContainer';
import PrimaryButton from '../../../../components/Core/PrimaryButton/PrimaryButton';

class TutorWorkExperienceListContainer extends Component {
  componentWillMount() {
    const { tutor } = this.props;
    this.props.loadWorkExperienceList(tutor.id);
  }

  showNewWorkExperienceForm() {
    this.props.showNewWorkExperienceForm();
  }

  deleteItem(tutorId, id) {
    this.props.deleteItem(tutorId, id);
  }

  showEditWorkExperienceForm(id) {
    this.props.showEditWorkExperienceForm(id);
  }

  render() {
    const { workExperiences } = this.props;

    const { showNewTutorWorkExperienceForm } = this.props;

    return (
      <div className="row user-detail">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t('account.tutot.work_experience.level.title')}</span>
            <div className="clearfix" />
          </div>
          <TutorWorkExperienceList
            workExperiences={workExperiences}
            deleteItem={this.deleteItem.bind(this)}
            currentWorkExperience={this.props.currentWorkExperience}
            showEditWorkExperienceForm={this.showEditWorkExperienceForm.bind(this)}
          />
          {
            showNewTutorWorkExperienceForm
              ? (
                <div>
                  <hr />
                  <NewWorkExperienceFormContainer />
                </div>
              ) : (<div />)
          }
          {
            !showNewTutorWorkExperienceForm
              ? (
                <PrimaryButton
                  isPrimary
                  line
                  iconButton
                  type="button"
                  callback={this.showNewWorkExperienceForm.bind(this)}
                  isSmallButton
                  title={this.context.t('account.tutot.edu.add_work_experience')}
                >
                  <i className="fa fa-plus" />
                </PrimaryButton>
              ) : null
          }
        </div>
      </div>
    );
  }
}

TutorWorkExperienceListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  loadWorkExperienceList: tutorId => dispatch(actions.loadWorkExperienceList(tutorId)),
  showNewWorkExperienceForm: () => dispatch(actions.showDashboardTutorNewWorkExperienceForm()),
  deleteItem: (tutorId, id) => dispatch(actions.deleteWorkExperience(tutorId, id)),
  showEditWorkExperienceForm: workExperienceId => dispatch(actions.showEditWorkExperienceForm(workExperienceId))
});

const mapStateToProps = state => ({
  tutor: state.TutorAccountReducer.tutor,
  workExperiences: state.DashboardTutorWorkExperienceList.workExperiences,
  currentWorkExperience: state.DashboardTutorWorkExperienceList.currentWorkExperience,
  showNewTutorWorkExperienceForm: state.DashboardTutorWorkExperienceList.showNewTutorWorkExperienceForm
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorWorkExperienceListContainer);
