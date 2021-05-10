import { GET_NACINIPLACANJA } from "../actions/types";

const initialState = {
  naciniPlacanja: [],
  nacinPlacanja: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NACINIPLACANJA:
      return {
        ...state,
        naciniPlacanja: action.payload,
      };
    default:
      return state;
  }
}