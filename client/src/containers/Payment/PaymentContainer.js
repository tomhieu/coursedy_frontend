import * as React from "react";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import {Elements} from "react-stripe-elements";
import {DomesticBank} from "../../components/Checkout/DomesticBank";
import * as Actions from '../../actions/PaymentActionCreator'
import styles from './PaymentContainer.module.scss';
import {connect} from "react-redux";
import cssModules from 'react-css-modules';
import {Component} from "react";

class PaymentContainer extends Component {
  componentWillMount() {
    this.props.dispatch(Actions.loadDomesticBankList());
  }
  render() {
    const {supportedBankList} = this.props;
    return (
      <div className="d-flex flex-vertical">
        <div className="Checkout">
          <Elements>
            <CheckoutForm fontSize="14"/>
          </Elements>
        </div>
        <DomesticBank supportedBankList={supportedBankList}/>
      </div>
    )
  }

}

PaymentContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PaymentContainer.propTypes = {};

const mapStateToProps = (state) => {
  const {Payment} = state;
  const {supportedBankList = []} = Payment;
  return supportedBankList;
};


const StyledComponent = cssModules(PaymentContainer, styles);

export default connect(
  mapStateToProps
)(StyledComponent);