import * as React from "react";
import {Component} from "react";
import {submit} from 'redux-form';
import {connect} from "react-redux";
import Modal from "react-bootstrap4-modal";
import PrimaryButton from "../../components/Core/PrimaryButton/PrimaryButton";

class FormDialogContainer extends Component {
  constructor(props) {
    super(props);
  }

  onSubmitPopup() {
    this.props.dispatch(submit(this.props.formName));
  }

  cancelPopup() {
    this.props.cancelCallback();
  }

  componentWillReceiveProps(nextProps) {
    // reset form before closing popup
    if (!nextProps.show) {
      this.props.reset();
    }
  }

  render() {
    const { show, title, cancelCallback,
            cancelLabel = this.context.t('close'),
            okLabel = this.context.t('ok')
      } = this.props;

    return (
      <Modal visible={show} onClickBackdrop={cancelCallback}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          {this.props.children}
        </div>
        <div className="modal-footer">
          <PrimaryButton type="button" line={false}
                         isPrimary={true}
                         callback={this.onSubmitPopup.bind(this)}
                         customClasses="button accept-button"
                         title={okLabel}>
          </PrimaryButton>
          <PrimaryButton type="button"
                         callback={this.cancelPopup.bind(this)}
                         isPrimary={false}
                         customClasses="button cancel-button"
                         title={cancelLabel}>
          </PrimaryButton>
        </div>
      </Modal>
    )
  }
}

FormDialogContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
};

FormDialogContainer.propTypes = {
  show: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
  cancelCallback: React.PropTypes.func.isRequired,
  okLabel: React.PropTypes.string,
  cancelLabel: React.PropTypes.string
}

export default connect()(FormDialogContainer);