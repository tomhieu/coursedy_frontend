export const FETCH_SUPPORTED_BANK_LIST_COMPLETE = "FETCH_SUPPORTED_BANK_LIST_COMPLETE"
const domesticBankList = [
  {
    id: 1,
    name: "ACB",
    bankAccount: {
      bankName: "Pham Duy Bao Trung",
      bankNumber: "9124 6788 6778 900",
      transaction: "Ly Thuong Kiet"
    }
  }
]

export const loadDomesticBankList = () => {
  return dispatch => {
    dispatch({
      type: FETCH_SUPPORTED_BANK_LIST_COMPLETE,
      data: domesticBankList
    });
  }
}