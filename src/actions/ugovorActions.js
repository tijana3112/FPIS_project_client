import axios from "axios";
import {
  GET_UGOVOR, GET_UGOVORI
} from "./types";

export const getUgovori = () => async (dispatch) => {
    const res = await axios.get("/api/ugovorOOsiguranju/findAll");
    dispatch({
      type: GET_UGOVORI,
      payload: res.data,
    });
  };

export const getUgovorById = (id, history) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/ugovorOOsiguranju/find/${id}`);
        dispatch({
            type: GET_UGOVOR,
            payload: res.data,
        });
    } catch (error) {
    history.push("/addRacun");
    }
  
};