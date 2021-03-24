export const initialState = {
  currency: "USD",
};

export const actionTypes = {
  CHANGE_CURRENCY: "CHANGE_CURRENCY",
};

const reduce = (state, action) => {
  console.log("state,action", state, action);
  switch (action.type) {
    case actionTypes.CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      };
    default:
      return state;
  }
};

export default reduce;
