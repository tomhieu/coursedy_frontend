import {FETCH_SUPPORTED_BANK_LIST_COMPLETE} from "actions/PaymentActionCreator";
import * as asyncActs from "../actions/AsyncActionCreator";
import {TT} from "utils/locale";

const Payment = (state = {
  supportedBankList: [],
  paymentHistory: [],
  paymentHistoryPagination: {
    currentPage: 1,
    totalResult: 0,
  },
  isFetchingPaymentHistory: true,
  errors: []
}, action) => {
  switch (action.type) {
    case FETCH_SUPPORTED_BANK_LIST_COMPLETE:
      return Object.assign({}, state, {supportedBankList: action.data})

    case asyncActs.FETCH_PAYMENT_HISTORY + asyncActs.PENDING:
      return {
        ...state, 
        isFetchingPaymentHistory: true,
        paymentHistory: []
      }
    case asyncActs.FETCH_PAYMENT_HISTORY + asyncActs.FULFILLED:
      return {
        ...state, 
        isFetchingPaymentHistory: false,
        paymentHistory: action.payload
      }
    case asyncActs.FETCH_PAYMENT_HISTORY + asyncActs.REJECTED:
      const errorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0) ?
        errors : [TT.t('fetch_payment_history_fail')];
      return {...state, paymentHistory: [], errors: errorMessages }

    default:
      return state
  }
}

export default Payment;