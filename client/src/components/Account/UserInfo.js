import * as React from "react";
import {Component} from "react";

class UserInfo extends Component {
  render() {
    let {user} = this.props;

    return (
      <div className="row user-detail">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account.person.info.title")}</span>
            <span className='pull-right inline-edit' onClick={this.props.showEditForm}><i className="fa fa-pencil"></i></span>
            <div className='clearfix'></div>
          </div>
          <div className='row'>
            <div className='col-sm-4'>
              <label className='control-label'>{this.context.t("account.person.info.full_name")}</label>
            </div>
            <div className='col-sm-8'>
              <span>{user.name}</span>
            </div>
          </div>
          <hr/>

          <div className='row'>
            <div className='col-sm-4'>
              <label className='control-label'>{this.context.t("account.person.info.email")}</label>
            </div>
            <div className='col-sm-8'>
              <span>{user.email}</span>
            </div>
          </div>
          <hr/>

          <div className='row'>
            <div className='col-sm-4'>
              <label className='control-label'>{this.context.t("account.person.info.birth.date")}</label>
            </div>
            <div className='col-sm-8'>
              <span>{user.date_of_birth}</span>
            </div>
          </div>
          <hr/>

          <div className='row'>
            <div className='col-sm-4'>
              <label className='control-label'>{this.context.t("account.person.info.address")}</label>
            </div>
            <div className='col-sm-8'>
              <span>{user.address}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UserInfo.contextTypes = {
  t: React.PropTypes.func.isRequired
}

UserInfo.propTypes = {
  user: React.PropTypes.object.isRequired,
  showEditForm: React.PropTypes.func.isRequired
}

export default UserInfo