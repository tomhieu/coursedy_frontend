import {Component} from "react";
import FormField from "components/Core/FormField";
import * as React from "react";
import defaultAvatar from '../../../images/default_avatar.png'
import {SERVER_NAME} from "utils/CommonConstant";

export class UserAvatarForm extends Component {
  setFileContent(file) {
    this.fileContent = file.content
  }

  submit(){
    this.props.onSubmit(this.fileContent)
  }

  render() {
    const {handleSubmit, user} = this.props;

    return (
      <form className='block-center-align' onSubmit={handleSubmit(this.submit.bind(this))}>
        <FormField fieldId="avatar"
                   isMandatoryField={false} formControlName="avatar"
                   internalPreview={true} typeField="upload_file"
                   previewUrl={user.avatar ? (SERVER_NAME + user.avatar) : defaultAvatar}
                   showLabel={false}
                   onUpload={this.setFileContent.bind(this)}
                   fieldLabel=''
        />

        <div className='form-group row'>
          <div className='col-sm-12 mb-5'>
            <button type="submit" className="btn btn-primary full-width">{this.context.t("save")}</button>
          </div>
          <div className='col-sm-12'>
            <button type="button" className="btn btn-small cancel-button full-width" onClick={this.props.cancel}>
              {this.context.t("cancel")}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

UserAvatarForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

UserAvatarForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
}