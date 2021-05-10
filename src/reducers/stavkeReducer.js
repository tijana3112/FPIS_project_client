import { GET_STAVKA, GET_STAVKE, DELETE_STAVKA } from "../actions/types";

const initialState = {
  stavke: [],
  stavka: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STAVKE:
      return {
        ...state,
        stavke: action.payload,
      };
    case GET_STAVKA:
      return {
        ...state,
        stavka: action.payload,
        };
    case DELETE_STAVKA:
        return {
            ...state,
            stavke: action.payload,
        };
    default:
      return state;
  }
}