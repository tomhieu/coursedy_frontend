import React, { Component} from 'react';
import cssModules from 'react-css-modules';
// import styles from '../Course.module.scss';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Modal, Button} from 'react-bootstrap';
import * as PublicCourseActions from '../../actions/PublicCourseActionCreator';
import FormField from "../../components/Core/FormField";
import {validate} from "../../validations/PublicCourseDetailFollowModalValidator"
import SimpleDialogComponent from '../../components/Core/SimpleDialogComponent'

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class PublicCourseDetailFollowModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  hidePublicCourseFollowModal() {
      this.props.dispatch(PublicCourseActions.closePublicCourseFollowModal())
  }
  showPublicCourseFollowModal() {
    if (!this.props.user) {
      this.props.dispatch(PublicCourseActions.showPublicCourseFollowModal())
    } else {
      this.props.dispatch(PublicCourseActions.submitFollowEmail(this.props.course.id));  
      this.showPublicCourseFollowStatusModal()
    }
  }
  
  hidePublicCourseFollowStatusModal() {
    this.props.dispatch(PublicCourseActions.closePublicCourseFollowStatusModal('detail'))
  }
  showPublicCourseFollowStatusModal() {
    this.props.dispatch(PublicCourseActions.showPublicCourseFollowStatusModal('detail'))
  }

  saveCourseFollowHandleSumit({email}) {
    this.props.dispatch(PublicCourseActions.submitFollowEmail([this.props.course.id], email));
    this.showPublicCourseFollowStatusModal()
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
      <div>
        <Button className={'btn btn-primary'} onClick={this.showPublicCourseFollowModal.bind(this)}>
          <i className={this.props.submit_follow_success ? 'fa fa-heart' : 'fa fa-heart-o'}></i>
        </Button>
        <Modal show={this.props.show_follow_modal} onHide={this.hidePublicCourseFollowModal.bind(this)}>
          <form onSubmit={handleSubmit(this.saveCourseFollowHandleSumit.bind(this))} className='inline-form'>  
            <Modal.Header>
              <Modal.Title>{this.context.t('course_follow')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              { submitAlert }
              <div className="">
                <div className="public-course-follow-email">
                  <FormField formGroupId={'emailId'} formLabel={this.context.t('account.person.info.email')}
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
        <SimpleDialogComponent
          show={this.props.show_follow_status_modal}
          title={this.context.t('course_follow_status')}
          cancelCallback={this.hidePublicCourseFollowStatusModal.bind(this)}
        >
          {submitAlert}
        </SimpleDialogComponent>

      </div>
    )
  }
}

PublicCourseDetailFollowModalContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PublicCourseDetailFollowModalContainer.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    course: state.PublicCourseDetail.course,
    show_follow_modal: state.PublicCourseDetail.show_follow_modal,
    submit_follow_success: state.PublicCourseDetail.submit_follow_success,
    submit_follow_fail: state.PublicCourseDetail.submit_follow_fail,
    show_follow_status_modal: state.PublicCourseDetail.show_follow_status_modal
  }
}

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'publicCourseDetailFollowModal',
    fields: ['email'],
    validate,
    enableReinitialize: true
})(PublicCourseDetailFollowModalContainer));
