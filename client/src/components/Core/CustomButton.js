import {Component} from "react";
import {Button} from "react-bootstrap";
import * as React from "react";

class CustomButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {onClickCallback, label, containerClasses, btnClasses} = this.props;
        return (
          <div className="row">
            <div className={"col-sm-12 text-center " + containerClasses}>
              <Button type="button" className={"btn-link " + btnClasses} onClick={onClickCallback}>
                {label}
              </Button>
            </div>
          </div>
        )
    }
}


CustomButton.contextTypes = {
    t: React.PropTypes.func.isRequired
};

CustomButton.propTypes = {
  onClickCallback: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired
}

export default CustomButton;