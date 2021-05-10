import axios from "axios";
import {
  DELETE_STAVKA, GET_STAVKA
} from "./types";


export const deleteStavka = (id) => async (dispatch) => {
    const res = await axios.delete(`/api/racunZaOsiguranje/deleteStavka/${id}`);
    dispatch({
      type: DELETE_STAVKA,
      payload: res.data,
    });
};

export const createStavka = (stavka, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/racunZaOsiguranje/createStavka", stavka);
    dispatch({
      type: GET_STAVKA,
      payload: res.data,
    });
  } catch (error) {
  }
};