import { GET_OBAVESTENJA, GET_OBAVESTENJE, DELETE_OBAVESTENJE } from "../actions/types";

const initialState = {
  obavestenja: [],
  obavestenje: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_OBAVESTENJA:
      return {
        ...state,
        obavestenja: action.payload,
      };
    case GET_OBAVESTENJE:
      return {
        ...state,
        obavestenje: action.payload,
      };
    case DELETE_OBAVESTENJE:
      return {
        ...state,
        obavestenja: action.payload,
      };
    default:
      return state;
  }
}