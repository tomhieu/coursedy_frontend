import * as React from "react";
import {Component} from "react";

class TutorDetail extends Component {
  render() {
    let {tutor} = this.props;

    return (
      <div className="row user-detail">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account_tutor_edu_title")}</span>
            <span className='pull-right inline-edit' onClick={this.props.showEditForm}><i className="fa fa-pencil"></i></span>
            <div className='clearfix'></div>
          </div>
          <div className='row'>
            <div className='col-sm-4'>
              <label className='control-label'>{this.context.t("account.tutot.edu.ocupation")}</label>
            </div>
            <div className='col-sm-8'>
              <span>{tutor.title}</span>
            </div>
          </div>
          <hr/>

          <div className='row'>
            <div className='col-sm-4'>
              <label className='control-label'>{this.context.t("account.tutor.edu.description")}</label>
            </div>
            <div className='col-sm-8'>
              <span>{tutor.description}</span>
            </div>
          </div>
          <hr/>

          <div className='row'>
            <div className='col-sm-4'>
              <label className='control-label'>{this.context.t("fields_of_teaching")}</label>
            </div>
            <div className='col-sm-8'>
              {
                tutor.categories.map((c) => {
                  return c.name
                }).join(', ')
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TutorDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TutorDetail.propTypes = {
  tutor: React.PropTypes.object.isRequired,
  showEditForm: React.PropTypes.func.isRequired
}

export default TutorDetail