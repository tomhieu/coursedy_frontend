

import {FETCH_SUPPORTED_BANK_LIST_COMPLETE} from "actions/PaymentActionCreator";

const Payment = (state = {
  supportedBankList: []
}, action) => {
  switch (action.type) {
    case FETCH_SUPPORTED_BANK_LIST_COMPLETE:
      return Object.assign({}, state, {supportedBankList: action.data})
    default:
      return state
  }
}

export default Payment;