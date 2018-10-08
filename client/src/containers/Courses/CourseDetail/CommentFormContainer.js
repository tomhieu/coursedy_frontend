import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import FormField from '../../../components/Core/FormField';
import { validate } from '../../../validations/CommonValidator';
import * as Actions from '../../../actions/PublicCourseActionCreator';
import PrimaryButton from '../../../components/Core/PrimaryButton/PrimaryButton';
import { TT } from '../../../utils/locale';
import { openConfirmationPopup } from '../../../actions/MainActionCreator';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CommentFormContainer extends Component {
  submitComment({ content }) {
    if (!this.props.user) {
      this.props.showWarningPopup(this.context.t('require_login'),
        this.context.t('course_submit_comment_require_login_message'),
        this.redirectToLogin.bind(this));
    } else {
      // Submit comment
      this.props.reset();
      this.props.onSubmitComment(content, this.props.course.id, this.props.user.id);
    }
  }

  redirectToLogin() {
    const courseId = this.props.course.id || this.props.match.params.id;
    this.props.history.push({
      pathname: '/login',
      search: `?next=/courses/${courseId}#comment-form-section`
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const placeholderId = "commentPlaceholder";
    const { activatingPlaceholders } = this.props
    return (
      <div className="course-detail-comment-form" id="comment-form-section">
        <form onSubmit={handleSubmit(this.submitComment.bind(this))} className="inline-form ml-0 mr-0">
          <FormField
            fieldId="course_comment_content"
            formGroupId="content"
            formLabel={this.context.t('course_comment_content')}
            placeholder={this.context.t('course_comment_content_placeholder')}
            isMandatoryField
            formControlName="content"
            typeField="custom_textarea"
          />
          <div className="d-flex justify-content-right">
            <PrimaryButton
              type="submit"
              line={false}
              customClasses="btn"
              title={this.context.t('send_comment_button')}
              disabled={pristine || submitting}
              placeholderId={placeholderId}
            />
          </div>
        </form>
      </div>
    );
  }
}

CommentFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CommentFormContainer.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    course: state.PublicCourseDetail.course,
    activatingPlaceholders: state.LoadingMask.activatingPlaceholders,
    // show_require_login_modal: state.PublicCourseDetail.show_require_login_modal,
    // show_comment_status_modal: state.PublicCourseDetail.show_comment_status_modal,
    submit_comment_success: state.PublicCourseDetail.submit_comment_success,
    submit_comment_fail: state.PublicCourseDetail.submit_comment_fail,
    require_login_message: state.PublicCourseDetail.require_login_message
  };
};

const mapDispatchToProps = dispatch => ({
  showWarningPopup: (title, message, callback) => dispatch(openConfirmationPopup(title, message, callback)),
  onSubmitComment: (content, courseId, userId) => {
    dispatch(Actions.submitCourseComment(content, courseId, userId)).then(({ value, action }) => {
      dispatch(openConfirmationPopup(TT.t('course_submit_comment_status'), TT.t('course_submit_comment_success')));
    }, (err) => {
      dispatch(openConfirmationPopup(TT.t('course_submit_comment_status'), TT.t('course_submit_comment_fail')));
    });
  }
});


export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'commentFormContainer',
  fields: ['content'],
  validate,
  enableReinitialize: true
})(CommentFormContainer));
