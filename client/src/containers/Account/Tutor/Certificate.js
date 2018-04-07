import * as React from "react";
import {Component} from "react";
import {CertificateForm} from "../../../components/Account/Tutor/CertificateForm";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {dispatch} from "redux";
import {
  addNewDocument,
  removeUploadedDocument,
  loadDegrees
} from "../../../actions/Tutor/Account/TutorAccountActionCreator";

import * as asyncActs from '../../../actions/AsyncActionCreator';
import * as courseActionTypes from '../../../constants/Courses';

class CertificateContainer extends Component {
  componentWillMount(){
    this.props.dispatch(loadDegrees());
  }

  delete(id) {
    this.props.dispatch(removeUploadedDocument(id));
  }

  upload(file){
    this.props.dispatch(addNewDocument(file));
  }

  download(id) {
    this.props.dispatch(downloadDegree(id));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t("account.tutot.edu.degree.title")}</span>
          </div>
          <CertificateForm
            upload={this.upload.bind(this)}
            download={this.download.bind(this)}
            delete={this.delete.bind(this)}
            degrees={this.props.certificates}
            {...this.props}
          />
        </div>
      </div>
    )
  }
};

CertificateContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect(state => ({
  certificates: state.Certificate.certificates
}))(reduxForm({
  form: 'certificate',
  // fields: ['name', 'email', 'address', 'date_of_birth'],
})(CertificateContainer));
