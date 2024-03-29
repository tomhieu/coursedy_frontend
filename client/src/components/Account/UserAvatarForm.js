import * as React from 'react';
import { Component } from 'react';
import FormField from 'components/Core/FormField';
import PrimaryButton from '../Core/PrimaryButton/PrimaryButton';

export class UserAvatarForm extends Component {
  setFileContent(file) {
    this.fileContent = file.content;
    this.props.selectAvatar();
  }

  submit() {
    this.props.onSubmit(this.fileContent);
    this.props.deselectAvatar();
  }

  render() {
    const {
      handleSubmit, avatarSelected, fieldId, scaleWidth, scaleHeight, placeholderId, lang
    } = this.props;

    return (
      <form className="block-center-align" onSubmit={handleSubmit(this.submit.bind(this))}>
        <FormField
          fieldId={fieldId}
          isMandatoryField={false}
          formControlName={fieldId}
          internalPreview
          typeField="upload_avatar"
          showLabel={false}
          zoneHeight="200px"
          onUpload={this.setFileContent.bind(this)}
          fieldLabel=""
          onFileRemoved={this.props.deselectAvatar}
          scaleWidth={scaleWidth}
          scaleHeight={scaleHeight}
          lang={lang}
        />

        <div className="row">
          <div className="col-sm-12 mb-5">
            <PrimaryButton
              type="submit"
              customClasses="full-width"
              disabled={!avatarSelected}
              title={this.context.t('save')}
              placeholderId={placeholderId}
            />
          </div>
          <div className="col-sm-12">
            <PrimaryButton
              isPrimary={false}
              type="button"
              customClasses="full-width"
              callback={this.props.cancel}
              title={this.context.t('cancel')}
            />
          </div>
        </div>
      </form>
    );
  }
}

UserAvatarForm.contextTypes = {
  t: React.PropTypes.func.isRequired
};

UserAvatarForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired,
  selectAvatar: React.PropTypes.func.isRequired,
  deselectAvatar: React.PropTypes.func.isRequired,
  avatarSelected: React.PropTypes.bool.isRequired,
  fieldId: React.PropTypes.string.isRequired,
  scaleWidth: React.PropTypes.number,
  scaleHeight: React.PropTypes.number,
  placeholderId: React.PropTypes.string
};
