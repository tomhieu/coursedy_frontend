import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import FormField from 'components/Core/FormField';
import { validate } from 'validations/CommentFormValidation';
import * as Actions from 'actions/TeacherActionCreators';
import PrimaryButton from 'components/Core/PrimaryButton/PrimaryButton';
import { openConfirmationPopup } from 'actions/MainActionCreator';
import { TT } from 'utils/locale';
import { withRouter } from 'react-router-dom';
import { fetchTeacherReviews } from '../../../../actions/TeacherActionCreators';


class ReviewTeacherForm extends Component {
  submitComment({ content }) {
    if (!this.props.user) {
      this.props.showWarningPopup(this.context.t('require_login'),
        this.context.t('course_submit_comment_require_login_message'),
        this.redirectToLogin.bind(this));
    } else {
      // Submit comment
      this.props.reset();
      this.props.onSubmitComment(content, this.props.teacher.id, this.props.user.id);
    }
  }

  redirectToLogin() {
    const teacherId = this.props.teacher.id || this.props.match.params.id;
    this.props.history.push({
      pathname: '/login',
      search: `?next=/teachers/${teacherId}#comment-form-section`
    });
  }

  render() {
    if (this.props.user && this.props.teacher.id === this.props.user.id) {
      return null;
    }
    const { handleSubmit, pristine, submitting } = this.props;
    const placeholderId = "reviewTeacherPlaceholder";
    const { activatingPlaceholders } = this.props
    const isProcessing = activatingPlaceholders.findIndex(holder => placeholderId == holder) >= 0;
    return (
      <div className="course-detail-comment-form mt-15" id="comment-form-section">
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
              customClasses="btn"
              title={this.context.t('send_comment_button')}
              line={false}
              disabled={pristine || submitting}
              placeholderId={placeholderId}
            />
          </div>
        </form>
      </div>
    );
  }
}

ReviewTeacherForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    teacher: state.TeacherDetail,
    activatingPlaceholders: state.LoadingMask.activatingPlaceholders
  };
};

const mapDispatchToProps = dispatch => ({
  showWarningPopup: (title, message, callback) => dispatch(openConfirmationPopup(title, message, callback)),
  onSubmitComment: (content, teacherId, userId) => {
    dispatch((Actions.submitTeacherComment({ content, teacherId, userId }))).then(({ value, action }) => {
      dispatch(openConfirmationPopup(TT.t('submit_comment_status'), TT.t('submit_comment_success')));
      dispatch(fetchTeacherReviews({
        teacherId: parseInt(teacherId),
        meta: 'userAccountPlaceholder',
        query: { sort_order: 'desc' }
      }));
    }, (err) => {
      dispatch(openConfirmationPopup(TT.t('submit_comment_status'), TT.t('submit_comment_fail')));
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'ReviewTeacherForm',
  fields: ['content'],
  validate,
  enableReinitialize: true
})(withRouter(ReviewTeacherForm)));
