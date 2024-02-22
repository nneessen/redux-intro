/* eslint-disable no-unused-vars */
import { createStore } from "redux";

const initialState = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdrawal":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
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

const store = createStore(reducer);

const ACTION_TYPES = {
  DEPOSIT: "account/deposit",
  WITHDRAWAL: "account/withdrawal",
  REQUEST_LOAN: "account/requestLoan",
  PAY_LOAN: "account/payLoan",
};

function deposit(amount) {
  return { type: ACTION_TYPES.DEPOSIT, payload: amount };
}

function withdrawal(amount) {
  return { type: ACTION_TYPES.WITHDRAWAL, payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: ACTION_TYPES.REQUEST_LOAN,
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: ACTION_TYPES.PAY_LOAN };
}

store.dispatch(deposit(12345));
store.dispatch(withdrawal(12345));
store.dispatch(requestLoan(10000, "Buy supplies for my business"));
store.dispatch(payLoan());
