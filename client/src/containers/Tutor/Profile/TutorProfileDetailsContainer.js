import React, {Component} from 'react';
import {TutorProfileDetails} from '../../../components/index';
import {connect} from 'react-redux';
import * as Actions from "actions/TutorProfileActionCreator"

class TutorProfileDetailsContainer extends Component {
  onUpdate(formData, onSuccess, onError){
    this.props.dispatch(Actions.updateTutor(this.props.tutor.id, formData, onSuccess, onError))
  }

  render(){
    return(
      <TutorProfileDetails {...this.props} onUpdate={this.onUpdate.bind(this)}/>
    )
  }
}

TutorProfileDetailsContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  tutor: state.TutorProfile.tutor
});

export default connect(
  mapStateToProps
)(TutorProfileDetailsContainer);