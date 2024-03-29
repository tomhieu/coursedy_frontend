import cssModules from 'react-css-modules';
import Modal from 'react-bootstrap4-modal';
import * as React from 'react';
import {Component} from 'react';
import {UserAvatarForm} from '../../Account/UserAvatarForm';
import styles from './CoursedyUploadImage.module.scss';
import UploadIcon from '../Icons/UploadIcon';
import Image from '../ImageComponent';

class CoursedyUploadImage extends Component {
  render() {
    const {
      fieldId, previewImage, previewImageClasses = 'media-object full-width',
      editImageLabel = this.context.t('update_image'), uploadCourseCoverImage,
      openPopupToSelectImage, closePopupToSelectImage, showPopupChangeImage, isSelectedNewImage,
      onSelectedNewImage, onDeselectNewImage, scaleWidth, scaleHeight, isUserAvatar = false, isEditable = true,
      isProcessing, placeholderId, defaultAvatar = 'http://placehold.it/800x600'
    } = this.props;
    const containerClasses = [styles.uploadImageContainer];
    const baseLineBtnClasses = [styles.baseLineBtn];
    if (isUserAvatar) {
      containerClasses.push(styles.avatarUser);
      baseLineBtnClasses.push(styles.btnChangeUserAvatar);
    }
    return (
      <div className={containerClasses.join(' ')}>
        {
          previewImage
            ? (
              <a className={styles.previewImageContainer}>
                <Image
                  className={previewImageClasses}
                  src={previewImage}
                  alt={editImageLabel}
                  fallbackSrc={defaultAvatar}
                />
                {
                  isEditable ? <span className={styles.editAvatarBtn} onClick={openPopupToSelectImage.bind(this)}>
                    <span className={baseLineBtnClasses.join(' ')}>
                      <i className="fa fa-camera" />
                      <span className="ml-5">{editImageLabel}</span>
                    </span>
                  </span> : null
                }

              </a>
            )
            : (
              <div className={styles.selectNewImage}>
                <div className="d-flex flex-auto justify-content-center align-items-center">
                  <div className="d-flex flex-horizontal align-self-center padd-10" onClick={openPopupToSelectImage.bind(this)}>
                    <a className="icon-upload">
                      <UploadIcon></UploadIcon>
                    </a>
                    <a className="ml-10 mt-10">{editImageLabel || this.context.t('drag_and_drop')}</a>
                  </div>
                </div>
              </div>
            )
        }


        <Modal visible={showPopupChangeImage} onClickBackdrop={closePopupToSelectImage.bind(this)}>
          <div className="modal-body">
            <UserAvatarForm
              onSubmit={uploadCourseCoverImage.bind(this)}
              cancel={closePopupToSelectImage.bind(this)}
              avatarSelected={isSelectedNewImage}
              selectAvatar={onSelectedNewImage.bind(this)}
              deselectAvatar={onDeselectNewImage.bind(this)}
              fieldId={fieldId}
              scaleWidth={scaleWidth}
              scaleHeight={scaleHeight}
              {...this.props}
              placeholderId={placeholderId}
              isProcessing={isProcessing}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

CoursedyUploadImage.contextTypes = {
  t: React.PropTypes.func.isRequired
};

CoursedyUploadImage.propTypes = {
  openPopupToSelectImage: React.PropTypes.func,
  closePopupToSelectImage: React.PropTypes.func,
  onDeselectNewImage: React.PropTypes.func,
  onSelectedNewImage: React.PropTypes.func,
  showPopupChangeImage: React.PropTypes.bool.isRequired,
  isSelectedNewImage: React.PropTypes.bool,
  previewImage: React.PropTypes.string,
  uploadCourseCoverImage: React.PropTypes.func.isRequired,
  scaleWidth: React.PropTypes.number,
  scaleHeight: React.PropTypes.number,
  editImageLabel: React.PropTypes.string,
  fieldId: React.PropTypes.string,
  isUserAvatar: React.PropTypes.bool,
  isEditable: React.PropTypes.bool,
  isProcessing: React.PropTypes.bool,
  placeholderId: React.PropTypes.string
};

export default cssModules(CoursedyUploadImage, styles);
