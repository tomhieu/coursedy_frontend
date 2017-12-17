import React, { Component} from 'react';
import cssModules from 'react-css-modules';
// import styles from '../Course.module.scss';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Modal, Button} from 'react-bootstrap';
import * as PublicCourseActions from '../../actions/PublicCourseActionCreator';
import FormField from "../../components/Core/FormField";
import {validate} from "../../validations/PublicCourseDetailFollowModalValidator"

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class PublicCourseDetailFollowModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  hidePopup() {
      this.props.dispatch(PublicCourseActions.closePublishCourseFollowModal())
  }
  showPopup() {
    if (!this.props.user) {
      this.props.dispatch(PublicCourseActions.showPublishCourseFollowModal())
    } else {
      this.props.dispatch(PublicCourseActions.submitFollowEmail(this.props.course.id));  
    }
  }

  saveCourseFollowHandleSumit({email}) {
    this.props.dispatch(PublicCourseActions.submitFollowEmail(this.props.course.id, email));
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
        <Button className={'btn btn-primary'} onClick={this.showPopup.bind(this)}>
          <i className={this.props.submit_follow_success ? 'fa fa-heart' : 'fa fa-heart-o'}></i>
        </Button>
        <Modal show={this.props.show_follow_modal} onHide={this.hidePopup.bind(this)}>
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

              <Button onClick={this.hidePopup.bind(this)}>{this.context.t('close')}</Button>
            </Modal.Footer>
          </form>
        </Modal>
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
