import React, { Component } from 'react';
import ConfirmationPopup from 'components/Common/ConfirmationPopup';

class DeleteIcon extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }

  showConfirmationPopup() {
    this.setState({ showPopup: true });
  }

  hideConfirmationPopup() {
    this.setState({ showPopup: false });
  }

  confirm() {
    this.props.action();
    this.hideConfirmationPopup();
  }

  render() {
    return (
      <span>
        <span className="delete-icon" onClick={this.showConfirmationPopup.bind(this)}><i className="fa fa-trash" /></span>
        <ConfirmationPopup
          title={this.props.comfirmationTitle}
          message={this.props.comfirmationMessage}
          show={this.state.showPopup}
          closePopup={this.hideConfirmationPopup.bind(this)}
          confirm={this.confirm.bind(this)}
        />
      </span>
    );
  }
}

DeleteIcon.contextTypes = {
  t: React.PropTypes.func.isRequired
};

DeleteIcon.propTypes = {
  action: React.PropTypes.func.isRequired,
  comfirmationMessage: React.PropTypes.string.isRequired,
  comfirmationTitle: React.PropTypes.string.isRequired
};

export default DeleteIcon;
