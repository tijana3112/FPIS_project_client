import axios from "axios";
import {
  GET_OLICE
} from "./types";

export const getOvlascenjaLica = () => async (dispatch) => {
    const res = await axios.get("/api/ovlascenoLice/findAll");
    dispatch({
      type: GET_OLICE,
      payload: res.data,
    });
  };