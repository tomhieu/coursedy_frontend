import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import * as React from "react";
import {Dialog, FlatButton} from "material-ui";

class SimpleDialogComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      const {show, title, acceptCallback, cancelCallback} = this.props;
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={cancelCallback}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={acceptCallback}
        />,
      ];

      const dialogStyle = {
        display: 'block'
      }

      const titleDialogStyle = {
        backgroundColor: '#534051',
        color: '#FFFFFF'
      }

      const bodyDialogStyle = {
        padding: '0'
      }

      return (
            <Dialog open={show} title={title}
                    style={dialogStyle}
                    titleStyle={titleDialogStyle}
                    bodyStyle={bodyDialogStyle}
                    autoScrollBodyContent={true}
                    onRequestClose={cancelCallback}
                    actions={actions}>
              <div className="dialog-body-container">
                {this.props.children}
              </div>
            </Dialog>
        )
    }
}

SimpleDialogComponent.contextTypes = {
    t: React.PropTypes.func.isRequired
};

SimpleDialogComponent.propTypes = {
    show: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    cancelCallback: React.PropTypes.func.isRequired
}

export default SimpleDialogComponent;