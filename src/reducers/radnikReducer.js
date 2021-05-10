import { GET_RADNICI } from "../actions/types";

const initialState = {
  radnici: [],
  radnik: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RADNICI:
      return {
        ...state,
        radnici: action.payload,
      };
    default:
      return state;
  }
}