import * as React from 'react';
import { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { dispatch } from 'redux';

import Network from 'utils/network';
import { CERTIFICATE } from '../../../actions/AsyncActionCreator';
import { CertificateForm } from '../../../components/Account/Tutor/CertificateForm';

class CertificateContainer extends Component {
  delete(id) {
    this.props.removeUploadedDocument(id);
  }

  upload(file) {
    this.props.addNewDocument(file);
  }

  download(id) {
    this.props.dispatch(downloadDegree(id));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="block-title">
            <span className="text-uppercase bold">{this.context.t('account.tutot.edu.degree.title')}</span>
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
    );
  }
}

CertificateContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

const mapStateToDispatch = dispatch => ({
  removeUploadedDocument: documentId => dispatch({
    type: CERTIFICATE.remove_uploaded_certificate,
    payload: Network().delete(`degrees/${documentId}`),
    meta: 'userCertificatePlaceholder'
  }),
  addNewDocument: file => dispatch({
    type: CERTIFICATE.upload_new_document,
    payload: Network().post('degrees', { degree: { item: file.content, name: file.fileName } }),
    meta: 'userCertificatePlaceholder'
  })
});

export default connect(state => ({
  certificates: state.Certificate.certificates,
  lang: state.i18nState.lang
}), mapStateToDispatch)(reduxForm({
  form: 'certificate',
  // fields: ['name', 'email', 'address', 'date_of_birth'],
})(CertificateContainer));
