import React, {Component} from 'react';
// import styles from '../Course.module.scss';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Button, Modal} from 'react-bootstrap';
import FormField from "../../../components/Core/FormField";
import {validate} from "../../../validations/CommonValidator";
import * as Actions from "../../../actions/PublicCourseActionCreator";
import SimpleDialogComponent from "../../../components/Core/SimpleDialogComponent"

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CommentFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_require_login_modal: false,
      show_comment_status_modal: false
    }
  }


  submitComment({content}) {
    if (!this.props.user) {
      console.log('DEBUG submitComment 1')
      this.showRequireLoginModal()
    } else {
      console.log('DEBUG submitComment 2')

      //Submit comment
      this.props.dispatch(Actions.submitCourseComment(content, this.props.course.id, this.props.user.id));
      //Sshow comment status
      this.showSubmitCommentStatusModal();
    }
  }

  hideRequireLoginModal() {
    this.setState({
      show_require_login_modal: false
    })
  }

  showRequireLoginModal() {
    this.setState({
      show_require_login_modal: true
    })
  }

  redirectToLogin() {
    this.hideRequireLoginModal()
    this.props.dispatch(Actions.redirectAfterLogin('course/'+this.props.course.id+'#comment-section'))
  }

  hideSubmitCommentStatusModal() {
    this.setState({
      show_comment_status_modal: false
    })
  }
  showSubmitCommentStatusModal() {
    this.setState({
      show_comment_status_modal: true
    })
  }

  render() {
    const {handleSubmit, valid} = this.props;
    let submitCommentMessage = null;
    const {show_require_login_modal, show_comment_status_modal} = this.state
    if (this.props.submit_comment_success) {
      submitCommentMessage = <div>
        {this.context.t('course_submit_comment_success')}  
      </div>
    } else if (this.props.submit_comment_fail) {
      submitCommentMessage = <div>
        {this.context.t('course_submit_comment_fail')}  
      </div>
    }
    return (
      <div className="course-detail-comment-form" id="comment-form-section">
        <form onSubmit={handleSubmit(this.submitComment.bind(this))} className='inline-form ml-0 mr-0'>
          <FormField fieldId={'course_comment_content'} formGroupId={'content'} formLabel={this.context.t('course_comment_content')}
                   placeholder={this.context.t('course_comment_content')} isMandatoryField={true}
                   formControlName={'content'} typeField={'custom_textarea'}></FormField>
          <Button type="submit" disabled={!valid} className="btn-primary">
            {this.context.t('save')}
          </Button>
        </form>

        {/* Require login modal */}
        <SimpleDialogComponent 
          title={this.context.t('require_login')}
          show={show_require_login_modal}
          acceptLabel={this.context.t('ok')}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideRequireLoginModal.bind(this)}
          acceptCallback={this.redirectToLogin.bind(this)}
        >
          {this.context.t('course_submit_comment_require_login_message')}
        </SimpleDialogComponent>

        {/* Submit enroll course message */}
        <SimpleDialogComponent 
          title={this.context.t('course_submit_comment_status')}
          show={show_comment_status_modal}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideSubmitCommentStatusModal.bind(this)}
        >
          {submitCommentMessage}
        </SimpleDialogComponent>

      </div>
    )
  }
}

CommentFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CommentFormContainer.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    course: state.PublicCourseDetail.course,
    // show_require_login_modal: state.PublicCourseDetail.show_require_login_modal,
    // show_comment_status_modal: state.PublicCourseDetail.show_comment_status_modal,
    submit_comment_success: state.PublicCourseDetail.submit_comment_success,
    submit_comment_fail: state.PublicCourseDetail.submit_comment_fail,
    require_login_message: state.PublicCourseDetail.require_login_message
  }
}

export default connect(
    mapStateToProps
)(reduxForm({
    form: 'commentFormContainer',
    fields: ['content'],
    validate,
    enableReinitialize: true
})(CommentFormContainer));
