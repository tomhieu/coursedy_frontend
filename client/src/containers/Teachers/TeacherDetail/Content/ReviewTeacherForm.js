import React, { Component } from 'react'


class ReviewTeacherForm extends Component {
  render() {
    return (
      <div className="review-teacher-form">
        <div id="change-search" className="collapse in" aria-expanded="true" style={{}}>
          <div className="review-form-wrapper mt-30">
            <h4>{this.context.t('leave_your_review_teacher')}</h4>
            <form className="clearfix">
              <div className="row gap-20">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <textarea className="form-control form-control-sm" rows={5} placeholder={this.context.t('enter_review')} defaultValue={""} />
                  </div>
                </div>
                <div className="clear" />
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <button className="btn btn-primary btn-sm mt-5">{this.context.t('review_submit_button')}</button>
                  <span className="btn btn-danger btn-toggle btn-sm mt-5" data-toggle="collapse" data-target="#change-search" aria-expanded="true">{this.context.t('review_cancel_button')}</span>
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

export default ReviewTeacherForm
