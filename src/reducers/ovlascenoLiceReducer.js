import { GET_OLICE } from "../actions/types";

const initialState = {
  ovlLica: [],
  ovlLice: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_OLICE:
      return {
        ...state,
        ovlLica: action.payload,
      };
    default:
      return state;
  }
}