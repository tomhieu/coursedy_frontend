import {StripeProvider} from "react-stripe-elements";
import {TT} from "utils/locale";
import * as React from "react";
import './PaymentPage.scss';
import PaymentContainer from "../../containers/Payment/PaymentContainer";

const PaymentPage = (props) => {
  return (
    <div className="payment-page full-width-in-container">
        <div className="payment-box">
          <h2 className="text-center">Thanh toán</h2>
          <div className="divider"></div>
          <PaymentContainer />
        </div>
    </div>

  );
};

export default PaymentPage;
