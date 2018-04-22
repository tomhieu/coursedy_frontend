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
      show_require_login_modal: false
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
      // this.props.dispatch(Actions.closePublicRequireLoginModal())
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
    this.props.dispatch(Actions.closePublicSubmitCommentStatusModal())
  }
  showSubmitCommentStatusModal() {
    this.props.dispatch(Actions.showPublicSubmitCommentStatusModal())
  }

  render() {
    const {handleSubmit, valid} = this.props;
    let submitCommentMessage = null;
    let requireLoginMessage = '';
    const {show_require_login_modal} = this.state
    if (this.props.submit_comment_success) {
      submitCommentMessage = <div className="alert alert-success">
        {this.context.t('course_submit_comment_success')}  
      </div>
    } else if (this.props.submit_comment_fail) {
      submitCommentMessage = <div className="alert alert-danger">
        {this.context.t('course_submit_comment_fail')}  
      </div>
    }
    return (
      <div className="course-detail-comment-form" id="comment-section">
        <div className="col-md-12">
          <form onSubmit={handleSubmit(this.submitComment.bind(this))} className='inline-form'>
            <FormField formGroupId={'content'} formLabel={this.context.t('course_comment_content')}
                     placeholder={this.context.t('course_comment_content')} isMandatoryField={true}
                     formControlName={'content'} typeField={'custom_textarea'}></FormField>
            <Button type="submit" disabled={!valid} className="btn-primary">
              {this.context.t('save')}
            </Button>
          </form>
        </div>


        {/* Require login modal */}
        <SimpleDialogComponent 
          title={this.context.t('course_enroll_require_login')}
          show={show_require_login_modal}
          acceptLabel={this.context.t('ok')}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideRequireLoginModal.bind(this)}
          acceptCallback={this.redirectToLogin.bind(this)}
        >
          Yêu cầu đăng nhập
        </SimpleDialogComponent>

      {/*  <Modal show={show_require_login_modal} onHide={this.hideRequireLoginModal.bind(this)}>
          <Modal.Header>
            <Modal.Title>{this.context.t('course_enroll_require_login')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.redirectToLogin.bind(this)}>{this.context.t('ok')}</Button>
            <Button onClick={this.hideRequireLoginModal.bind(this)}>{this.context.t('close')}</Button>
          </Modal.Footer>
        </Modal>*/}

        {/* Submit enroll course message */}
        <SimpleDialogComponent 
          title={this.context.t('course_submit_comment_status')}
          show={this.props.show_comment_status_modal}
          acceptLabel={this.context.t('ok')}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideSubmitCommentStatusModal.bind(this)}
          acceptCallback={this.hideSubmitCommentStatusModal.bind(this)}
        >
          {submitCommentMessage}
        </SimpleDialogComponent>
    {/*    <Modal show={this.props.show_comment_status_modal} onHide={this.hideSubmitCommentStatusModal.bind(this)}>
          <Modal.Header>
            <Modal.Title>{this.context.t('course_submit_comment_status')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitCommentMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideSubmitCommentStatusModal.bind(this)}>{this.context.t('close')}</Button>
          </Modal.Footer>
        </Modal>*/}

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
    show_comment_status_modal: state.PublicCourseDetail.show_comment_status_modal,
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
