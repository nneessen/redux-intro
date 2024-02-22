/* eslint-disable no-unused-vars */

const initialStateAccount = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
};

const ACCOUNT_ACTION_TYPES = {
  DEPOSIT: "account/deposit",
  WITHDRAWAL: "account/withdrawal",
  REQUEST_LOAN: "account/requestLoan",
  PAY_LOAN: "account/payLoan",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case ACCOUNT_ACTION_TYPES.DEPOSIT:
      return { ...state, balance: state.balance + action.payload };
    case ACCOUNT_ACTION_TYPES.WITHDRAWAL:
      return { ...state, balance: state.balance - action.payload };
    case ACCOUNT_ACTION_TYPES.REQUEST_LOAN:
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case ACCOUNT_ACTION_TYPES.PAY_LOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

// ACTION FUNCTIONS
function deposit(amount) {
  return { type: ACCOUNT_ACTION_TYPES.DEPOSIT, payload: amount };
}

function withdrawal(amount) {
  return { type: ACCOUNT_ACTION_TYPES.WITHDRAWAL, payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: ACCOUNT_ACTION_TYPES.REQUEST_LOAN,
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: ACCOUNT_ACTION_TYPES.PAY_LOAN };
}

export { deposit, withdrawal, payLoan, requestLoan };
