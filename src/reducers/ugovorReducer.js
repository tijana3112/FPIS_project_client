import { GET_UGOVOR, GET_UGOVORI } from "../actions/types";

const initialState = {
  ugovori: [],
  ugovor: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_UGOVORI:
      return {
        ...state,
        ugovori: action.payload,
      };
    case GET_UGOVOR:
      return {
        ...state,
        ugovori: action.payload,
        };
    default:
      return state;
  }
}