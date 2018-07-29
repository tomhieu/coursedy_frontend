import React, {Component} from 'react';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Button, Modal} from 'react-bootstrap';
import FormField from "../../../components/Core/FormField";
import {validate} from "../../../validations/CommonValidator";
import * as Actions from "../../../actions/PublicCourseActionCreator";
import SimpleDialogComponent from "../../../components/Core/SimpleDialogComponent"
import PrimaryButton from "../../../components/Core/PrimaryButton/PrimaryButton";
import * as WebConstants from "../../../constants/WebConstants";
import {TT} from "../../../utils/locale";
import {openConfirmationPopup} from "../../../actions/MainActionCreator";

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CommentFormContainer extends Component {

  submitComment({content}) {
    if (!this.props.user) {
      this.props.showWarningPopup(this.context.t('require_login'),
                                  this.context.t('course_submit_comment_require_login_message'),
                                  this.redirectToLogin.bind(this));
    } else {
      //Submit comment
      this.props.reset();
      this.props.onSubmitComment(content, this.props.course.id, this.props.user.id);
    }
  }

  redirectToLogin() {
    this.props.redirectToLogin(this.props.course.id);
  }

  render() {
    const {handleSubmit, valid} = this.props;
    return (
      <div className="course-detail-comment-form" id="comment-form-section">
        <form onSubmit={handleSubmit(this.submitComment.bind(this))} className='inline-form ml-0 mr-0'>
          <FormField fieldId={'course_comment_content'} formGroupId={'content'} formLabel={this.context.t('course_comment_content')}
                   placeholder={this.context.t('course_comment_content')} isMandatoryField={true}
                   formControlName={'content'} typeField={'custom_textarea'}></FormField>
          <PrimaryButton type="submit" line={false} disabled={!valid} title={this.context.t('save')}>
          </PrimaryButton>
        </form>
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

const mapDispatchToProps = (dispatch) => ({
  showWarningPopup: (title, message, callback) => dispatch(openConfirmationPopup(title, message, callback)),
  onSubmitComment: (content, courseId, userId) => {
    dispatch(Actions.submitCourseComment(content, courseId, userId)).then(({value, action}) => {
      dispatch(openConfirmationPopup(TT.t('course_submit_comment_status'), TT.t('course_submit_comment_success')))
    }, (err) => {
      dispatch(openConfirmationPopup(TT.t('course_submit_comment_status'), TT.t('course_submit_comment_fail')))
    });
  },
  redirectToLogin: (courseId) => dispatch(Actions.redirectAfterLogin('course/'+ courseId +'#comment-section'))
});


export default connect(
    mapStateToProps, mapDispatchToProps
)(reduxForm({
    form: 'commentFormContainer',
    fields: ['content'],
    validate,
    enableReinitialize: true
})(CommentFormContainer));
