import * as React from "react";
import {Component} from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import CoursedyUploadImage from "../../../components/Core/CoursedyUploadImage/CoursedyUploadImage";

class CourseCoverImageContainer extends Component {

  render() {
    const {courseCoverImage, uploadCourseCoverImage, openPopupToChangeCoverImage,
      closePopupToChangeCoverImage, showPopupChangeCoverImage, selectedNewCoverImage,
      onSelectedNewCoverImage, onDeselectNewCoverImage } = this.props;
    return (
      <CoursedyUploadImage uploadCourseCoverImage={uploadCourseCoverImage.bind(this)}
                           closePopupToSelectImage={closePopupToChangeCoverImage.bind(this)}
                           editImageLabel={this.context.t('update_cover_image')}
                           onDeselectNewImage={onDeselectNewCoverImage.bind(this)}
                           onSelectedNewImage={onSelectedNewCoverImage.bind(this)}
                           isSelectedNewImage={selectedNewCoverImage}
                           openPopupToSelectImage={openPopupToChangeCoverImage.bind(this)}
                           showPopupChangeImage={showPopupChangeCoverImage}
                           previewImage={courseCoverImage ? courseCoverImage : undefined}
                           fieldId="cover_image_Id"
                           scaleWidth={16}
                           scaleHeight={7}
                           {...this.props} />
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