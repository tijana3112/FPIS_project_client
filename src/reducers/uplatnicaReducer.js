import { GET_UPLATNICE } from "../actions/types";

const initialState = {
  uplatnice: [],
  uplatnica: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_UPLATNICE:
      return {
        ...state,
        uplatnice: action.payload,
      };
    default:
      return state;
  }
}