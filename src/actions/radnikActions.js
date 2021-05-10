import axios from "axios";
import {
  GET_RADNICI
} from "./types";

export const getRadnici = () => async (dispatch) => {
    const res = await axios.get("/api/radnik/findAll");
    dispatch({
      type: GET_RADNICI,
      payload: res.data,
    });
  };