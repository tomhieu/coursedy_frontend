import React, {Component} from 'react';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Button, Modal} from 'react-bootstrap';
import * as PublicCourseActions from '../../../actions/PublicCourseActionCreator';
import FormField from "../../../components/Core/FormField";
import {validate} from "../../../validations/PublicCourseListFollowModalValidator"

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class PublicCourseListFollowModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  hidePublicCourseFollowModal() {
      this.props.dispatch(PublicCourseActions.closePublicCourseFollowModal('list'))
  }
  showPublicCourseFollowModal() {
    if (!this.props.user) {
      this.props.dispatch(PublicCourseActions.showPublicCourseFollowModal('list'))
    } else {
      this.props.dispatch(PublicCourseActions.submitFollowEmail(this.props.selectedCourses, this.props.user.email, 'list'));
      this.showPublicCourseFollowStatusModal();
    }
  }

  hidePublicCourseFollowStatusModal() {
    this.props.dispatch(PublicCourseActions.closePublicCourseFollowStatusModal('list'))
  }
  showPublicCourseFollowStatusModal() {
    this.props.dispatch(PublicCourseActions.showPublicCourseFollowStatusModal('list'))
  }

  saveCourseFollowHandleSumit({email}) {
    this.props.dispatch(PublicCourseActions.submitFollowEmail(this.props.selectedCourses, email, 'list'));
    this.showPublicCourseFollowStatusModal();
  }

  render() {
    const {handleSubmit, valid} = this.props;
    let submitAlert = null;
    if (this.props.submit_follow_success) {
      submitAlert = <div className="alert alert-success">
        {this.context.t('course_follow_submit_success')}  
      </div>
    }
    if (this.props.submit_follow_fail) {
      submitAlert = <div className="alert alert-danger">
        {this.context.t('course_follow_submit_fail')}
      </div>
    }

    return (
      <div className="text-center">
        <Modal show={this.props.show_follow_modal} onHide={this.hidePublicCourseFollowModal.bind(this)}>
          <form onSubmit={handleSubmit(this.saveCourseFollowHandleSumit.bind(this))} className='inline-form'>  
            <Modal.Header>
              <Modal.Title>{this.context.t('course_follow')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              { submitAlert }
              <div className="">
                <div className="public-course-follow-email">
                  <FormField fieldId={'emailId'} fieldLabel={this.context.t('account.person.info.email')}
                     placeholder={this.context.t('account.person.info.email')} isMandatoryField={true}
                     formControlName={'email'} typeField={'custom_input'}></FormField>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" disabled={!valid} className="btn-primary"
              >
                {this.context.t('save')}
              </Button>

              <Button onClick={this.hidePublicCourseFollowModal.bind(this)}>{this.context.t('close')}</Button>
            </Modal.Footer>
          </form>
        </Modal>


        {/* Follow course status modal */}
        <Modal show={this.props.show_follow_status_modal} onHide={this.hidePublicCourseFollowStatusModal.bind(this)}>
          <Modal.Header>
            <Modal.Title>{this.context.t('course_follow_status')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitAlert}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hidePublicCourseFollowStatusModal.bind(this)}>{this.context.t('close')}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

PublicCourseListFollowModalContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PublicCourseListFollowModalContainer.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    selectedCourses: state.CourseFilter.selectedCourses,
    show_follow_modal: state.PublicCourseList.show_follow_modal,
    submit_follow_success: state.PublicCourseList.submit_follow_success,
    submit_follow_fail: state.PublicCourseList.submit_follow_fail,

    show_follow_status_modal: state.PublicCourseList.show_follow_status_modal,
  }
}

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'publicCourseListFollowModal',
    fields: ['email'],
    validate,
    enableReinitialize: true
})(PublicCourseListFollowModalContainer));
