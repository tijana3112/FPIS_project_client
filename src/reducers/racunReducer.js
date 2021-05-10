import { GET_RACUN, GET_RACUNI, DELETE_RACUN, GET_RACUNUP } from "../actions/types";

const initialState = {
  racuni: [],
  racun: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RACUNI:
      return {
        ...state,
        racuni: action.payload,
      };
    case GET_RACUN:
      return {
        ...state,
        racuni: action.payload,
      };
      case GET_RACUNUP:
      return {
        ...state,
        racun: action.payload,
      };
    case DELETE_RACUN:
      return {
        ...state,
        racuni: action.payload,
      };
    default:
      return state;
  }
}