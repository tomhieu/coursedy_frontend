import React, { Component } from 'react'
import FormField from '../../../../components/Core/FormField'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'


class ReviewTeacherForm extends Component {
  render() {
    const {handleSubmit} = this.props

    return (
      <div className="review-teacher-form">
        <div id="change-search" className="collapse in" aria-expanded="true" style={{}}>
          <div className="review-form-wrapper mt-30">
            <h3>{this.context.t('leave_your_review_teacher')}</h3>
            <form className="clearfix">
              <div className="row gap-20">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <FormField fieldId={'content'} fieldLabel={this.context.t('enter_review')}
                             placeholder={this.context.t('enter_review')} isMandatoryField={true}
                             formControlName={'content'} typeField={'custom_textarea'}>
                  </FormField>
                </div>
                <div className="clear" />
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <button className="btn btn-primary btn-small mt-5 mr-10">{this.context.t('review_submit_button')}</button>
                  <span className="btn btn-default btn-toggle btn-small mt-5 ml-10 cancel-button" data-toggle="collapse" data-target="#change-search" aria-expanded="true">{this.context.t('review_cancel_button')}</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ReviewTeacherForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect()(reduxForm({
  form: 'ReviewTeacherForm',
})(ReviewTeacherForm))

