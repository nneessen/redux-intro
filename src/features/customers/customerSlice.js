/* eslint-disable no-unused-vars */
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createAt: "",
};

const CUSTOMER_ACTION_TYPES = {
  CREATE_CUSTOMER: "customer/createCustomer",
  UPDATE_CUSTOMER_NAME: "customer/updateCustomer",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case CUSTOMER_ACTION_TYPES.CREATE_CUSTOMER:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case CUSTOMER_ACTION_TYPES.UPDATE_CUSTOMER_NAME:
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

function createCustomer(fullName, nationalID) {
  return {
    type: CUSTOMER_ACTION_TYPES.CREATE_CUSTOMER,
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: CUSTOMER_ACTION_TYPES.UPDATE_CUSTOMER_NAME,
    payload: fullName,
  };
}

export { createCustomer, updateName };
