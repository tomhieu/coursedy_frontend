import {Component} from "react";
import {Modal, ModalBody} from 'reactstrap';
import * as React from "react";
import {reduxForm} from "redux-form";
import {UserAvatarForm} from "../../../components/Account/UserAvatarForm";
import {connect} from "react-redux";

class CourseCoverImageContainer extends Component {

  render() {
    const {courseCoverImage, uploadCourseCoverImage, openPopupToChangeCoverImage,
      closePopupToChangeCoverImage, showPopupChangeCoverImage, selectedNewCoverImage,
      onSelectedNewCoverImage, onDeselectNewCoverImage } = this.props;
    return (
      <div className="col-sm-12 mb-15 avatar-container">
        <figure className="full-width">
          <img className="media-object full-width" src={courseCoverImage} alt={'new cover image'}/>
        </figure>
        <span className='edit-avatar-btn' onClick={openPopupToChangeCoverImage.bind(this)}>
          <span className='base-line-btn'>
            <i className='fa fa-camera'/>
            <span className='ml-10'>{this.context.t('update_cover_image')}</span>
          </span>
        </span>
        <Modal isOpen={showPopupChangeCoverImage} onClosed={closePopupToChangeCoverImage.bind(this)}>
          <ModalBody>
            <UserAvatarForm onSubmit={uploadCourseCoverImage.bind(this)}
                            cancel={closePopupToChangeCoverImage.bind(this)}
                            avatarSelected={selectedNewCoverImage}
                            selectAvatar={onSelectedNewCoverImage.bind(this)}
                            deselectAvatar={onDeselectNewCoverImage.bind(this)}
                            fieldId="cover_image_Id"
                            scaleWidth={16}
                            scaleHeight={9}
                            {...this.props}
            />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

CourseCoverImageContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseCoverImageContainer.propTypes = {
  openPopupToChangeCoverImage: React.PropTypes.func,
  closePopupToChangeCoverImage: React.PropTypes.func,
  onDeselectNewCoverImage: React.PropTypes.func,
  onSelectedNewCoverImage: React.PropTypes.func,
  showPopupChangeCoverImage: React.PropTypes.bool.isRequired,
  selectedNewCoverImage: React.PropTypes.bool,
  courseCoverImage: React.PropTypes.string.isRequired,
  uploadCourseCoverImage: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.session.currentUser
})

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'updateCourseCoverImageForm',
  fields: ['cover_image_Id']
})(CourseCoverImageContainer))