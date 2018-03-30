
import {StripeProvider} from "react-stripe-elements";
import CourseItem from "../../components/Courses/CourseItem/CourseItem";
import {TT} from "utils/locale";
import * as React from "react";
import PaymentContainer from "../../containers/Payment/PaymentContainer";

const PaymentPage = (props) => {
  const {course, totalAmount, currency} = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 col-sm-5">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <span>{TT.t('total_payment')}</span>
              <div className="d-flex flex-horizontal">
                <span>{currency}</span>
                <span>{totalAmount}</span>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <span>{TT.t('payment_methods')}</span>
              <div className="d-flex flex-horizontal">
                <span>{currency}</span>
                <span>{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-sm-7">
          <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
            <PaymentContainer courseId={props.match.params.id}/>
          </StripeProvider>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
