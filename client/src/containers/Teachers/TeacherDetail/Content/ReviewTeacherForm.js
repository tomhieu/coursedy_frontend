import React, {Component} from 'react';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Button} from 'react-bootstrap';
import FormField from "../../../../components/Core/FormField";
import {validate} from "../../../../validations/CommentFormValidation";
import * as Actions from "../../../../actions/TeacherActionCreators";
import SimpleDialogComponent from "../../../../components/Core/SimpleDialogComponent"


class ReviewTeacherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRequireLoginModal: false,
      showCommentStatusModal: false
    }
  }

  submitComment({content}) {
    if (!this.props.user) {
      this.showRequireLoginModal()
    } else {
      //Submit comment
      // if (this.props.user.id !== this.props.teacher.user_id)
      this.props.dispatch(Actions.submitTeacherComment({content, teacherId: this.props.teacher.user_id, user_id: this.props.user.id}));
      //Show comment status
      this.showSubmitCommentStatusModal();
    }
  }

  hideRequireLoginModal() {
    this.setState({
      showRequireLoginModal: false
    })
  }

  showRequireLoginModal() {
    this.setState({
      showRequireLoginModal: true
    })
  }

  redirectToLogin() {
    this.hideRequireLoginModal()

  }

  hideSubmitCommentStatusModal() {
    this.setState({
      showCommentStatusModal: false
    })
  }

  showSubmitCommentStatusModal() {
    this.setState({
      showCommentStatusModal: true
    })
  }

  render() {
    const { handleSubmit, submitting } = this.props
    let submitCommentMessage = null;
    const {showRequireLoginModal, showCommentStatusModal} = this.state
    if (this.props.submitCommentSuccess) {
      submitCommentMessage = <div>
        {this.context.t('submit_comment_success')}
      </div>
    } else if (this.props.submitCommentFail) {
      submitCommentMessage = <div>
        {this.context.t('submit_comment_fail')}
      </div>
    }

    return (
      <div className="mt-30" id="comment-form-section">
        <form onSubmit={handleSubmit(this.submitComment.bind(this))} className='inline-form ml-0 mr-0'>
          <FormField fieldId={'comment_content'}
                     formGroupId={'content'}
                     formLabel={this.context.t('comment_content')}
                     placeholder={this.context.t('comment_content')}
                     isMandatoryField={true}
                     formControlName={'content'}
                     typeField={'custom_textarea'}>
          </FormField>
          <Button type="submit" disabled={submitting} className="btn-primary">
            {this.context.t('save')}
          </Button>
        </form>
        {/* Require login modal */}
        <SimpleDialogComponent
          title={this.context.t('require_login')}
          show={showRequireLoginModal}
          acceptLabel={this.context.t('ok')}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideRequireLoginModal.bind(this)}
          acceptCallback={this.redirectToLogin.bind(this)}
        >
          {this.context.t('submit_comment_require_login_message')}
        </SimpleDialogComponent>

        {/* Submit enroll course message */}
        <SimpleDialogComponent
          title={this.context.t('submit_comment_status')}
          show={showCommentStatusModal}
          cancelLabel={this.context.t('close')}
          cancelCallback={this.hideSubmitCommentStatusModal.bind(this)}
        >
          {submitCommentMessage}
        </SimpleDialogComponent>

      </div>
    )
  }
}

ReviewTeacherForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

ReviewTeacherForm.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    teacher: state.TeacherDetail,
    submitCommentSuccess: state.TeacherDetail.submitCommentSuccess,
    submitCommentFail: state.TeacherDetail.submitCommentFail,
  }
}


export default connect(
  mapStateToProps
)(reduxForm({
  form: 'ReviewTeacherForm',
  fields: ['content'],
  validate,
  enableReinitialize: true
})(ReviewTeacherForm));
