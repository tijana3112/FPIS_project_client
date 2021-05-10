import { GET_OSIGKUCE } from "../actions/types";

const initialState = {
  osigKuce: [],
  osigKuca: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_OSIGKUCE:
      return {
        ...state,
        osigKuce: action.payload,
      };
    default:
      return state;
  }
}