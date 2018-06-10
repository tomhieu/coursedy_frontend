import {Component} from "react";
import FormField from "components/Core/FormField";
import * as React from "react";
import defaultAvatar from '../../../images/default_avatar.png'
import {SERVER_NAME} from "utils/CommonConstant";
import PrimaryButton from "../Core/PrimaryButton/PrimaryButton";

export class UserAvatarForm extends Component {
  setFileContent(file) {
    this.fileContent = file.content
    this.props.selectAvatar()
  }

  submit(){
    this.props.onSubmit(this.fileContent)
    this.props.deselectAvatar()
  }
  
  render() {
    const {handleSubmit, user, avatarSelected, deselectAvatar} = this.props;

    return (
      <form className='block-center-align' onSubmit={handleSubmit(this.submit.bind(this))}>
        <FormField fieldId="avatar"
                   isMandatoryField={false} formControlName="avatar"
                   internalPreview={true} typeField="upload_avatar"
                   showLabel={false} zoneHeight={'200px'}
                   onUpload={this.setFileContent.bind(this)}
                   fieldLabel=''
                   onFileRemoved={this.props.deselectAvatar}
        />

        <div className='row'>
          <div className='col-sm-12 mb-5'>
            <PrimaryButton type="submit" customClasses="full-width"
                           disabled={!avatarSelected} title={this.context.t("save")}>
            </PrimaryButton>
          </div>
          <div className='col-sm-12'>
            <PrimaryButton type="button" customClasses="full-width"
                           callback={this.props.cancel}
                           disabled={!avatarSelected} title={this.context.t("cancel")}>
            </PrimaryButton>
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
  cancel: React.PropTypes.func.isRequired,
  selectAvatar: React.PropTypes.func.isRequired,
  deselectAvatar: React.PropTypes.func.isRequired,
  avatarSelected: React.PropTypes.bool.isRequired
}