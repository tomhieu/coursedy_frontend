import cssModules from 'react-css-modules';
import { Modal, ModalBody } from 'reactstrap';
import { Component } from 'react';
import * as React from 'react';
import { TT } from 'utils/locale';
import { UserAvatarForm } from '../../Account/UserAvatarForm';
import styles from './CoursedyUploadImage.module.scss';

class CoursedyUploadImage extends Component {
  render() {
    const {
      fieldId, previewImage, previewImageClasses = 'media-object full-width',
      editImageLabel = this.context.t('update_image'), uploadCourseCoverImage,
      openPopupToSelectImage, closePopupToSelectImage, showPopupChangeImage, isSelectedNewImage,
      onSelectedNewImage, onDeselectNewImage, scaleWidth, scaleHeight, isUserAvatar = false, isEditable = true
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
                <img className={previewImageClasses} src={previewImage} alt={editImageLabel} />
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
                      <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                      </svg>
                    </a>
                    <a className="ml-10">{editImageLabel || TT.changeLocale(this.props.lang).t('drag_and_drop')}</a>
                  </div>
                </div>
              </div>
            )
        }


        <Modal isOpen={showPopupChangeImage} onClosed={closePopupToSelectImage.bind(this)}>
          <ModalBody>
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
            />
          </ModalBody>
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
  isEditable: React.PropTypes.bool
};

export default cssModules(CoursedyUploadImage, styles);
