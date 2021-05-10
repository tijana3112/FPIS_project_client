import axios from "axios";
import {
  GET_NACINIPLACANJA
} from "./types";

export const getNaciniPlacanja = () => async (dispatch) => {
    const res = await axios.get("/api/nacinPlacanja/findAll");
    dispatch({
      type: GET_NACINIPLACANJA,
      payload: res.data,
    });
  };