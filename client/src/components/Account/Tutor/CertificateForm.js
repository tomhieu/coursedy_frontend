import {Component} from "react";
import FormField from "../../Core/FormField";
import * as React from "react";

// import {savePersonData} from "actions/TutorAccountActionCreator";

export class CertificateForm extends Component {

  render() {
    let self = this;
    let {degrees} = this.props

    return (
      <form>
        {/*degrees list*/}
        <div className='row'>
          <div className="uploaded-degrees-container col-md-12 col-sm-12">
            {degrees.length > 0 ? degrees.map((degree) => <div
                key={degree.id}>{renderUploadedDegree(degree, self.props)}</div>) :
              <div>{this.context.t('account.tutot.edu.degree.no_degrees')}</div>}
          </div>
        </div>

        {/*form for uploading certificates*/}
        <div className='row mt-30'>
          <div className={'col-sm-12'}>
            <FormField formGroupId="degreesId" formLabel={this.context.t("account.tutot.edu.degree.field_label")}
                       onUpload={this.props.upload} isMandatoryField={false} formControlName="degrees"
                       internalPreview={false} typeField="upload_file"/>
          </div>
        </div>
      </form>
    )
  }
}

function renderUploadedDegree(degree, props) {
  let previewImage = <div className='pdf-image-preview'></div>;
  let extension = degree.name ? degree.name.split('.').pop() : '';
  if (['jpg', 'png', 'jpeg', 'gif'].indexOf(extension) >= 0) {
    previewImage = <img src={degree.url} width='auto' height='30'></img>;
  } else if (extension == 'docx' || extension == 'doc') {
    previewImage = <div className='doc-image-preview'></div>;
  }

  return (
    <div className="row mb-10">
      <div className='col-sm-2'>
        {previewImage}
      </div>
      <div className='col-sm-7' style={{wordWrap: 'break-word'}}>
        {degree.name}
      </div>
      <div className='col-sm-3 text-right'>
        <a className="ml-10" href={degree.url} target="_blank"><i className="fa fa-arrow-down"></i></a>
        <a className="ml-10" onClick={() => props.delete(degree.id)} title={degree.name}><i className='fa fa-trash'></i></a>
      </div>
    </div>
  )
}

CertificateForm.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CertificateForm.propTypes = {
  download: React.PropTypes.func.isRequired,
  delete: React.PropTypes.func.isRequired,
  degrees: React.PropTypes.array.isRequired,
  upload: React.PropTypes.func.isRequired,
}