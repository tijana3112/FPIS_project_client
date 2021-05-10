import axios from "axios";
import {
  GET_OSIGKUCE
} from "./types";

export const getOsigKuce = () => async (dispatch) => {
    const res = await axios.get("/api/osigKuca/findAll");
    dispatch({
      type: GET_OSIGKUCE,
      payload: res.data,
    });
  };