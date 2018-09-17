import {StripeProvider} from "react-stripe-elements";
import {TT} from "utils/locale";
import * as React from "react";
import './PaymentPage.scss';
import PaymentContainer from "../../containers/Payment/PaymentContainer";

const PaymentPage = (props) => {
  return (
    <div className="payment-page">
      <PaymentContainer />
    </div>
  );
};

PaymentPage.contextTypes = {
  t: React.PropTypes.func.isRequired
};
export default PaymentPage;
