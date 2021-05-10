import axios from "axios";
import {
  GET_RACUN, GET_RACUNI, DELETE_RACUN, GET_RACUNUP, GET_ERRORS
} from "./types";

export const createRacun = (racun, history) => async (dispatch) => {
  try {
    await axios.post("/api/racunZaOsiguranje/createRacun", racun);
    history.push("/racunList");
  } catch (error) {
  }
};

export const getRacuni = () => async (dispatch) => {
  const res = await axios.get("/api/racunZaOsiguranje/findAll");
  dispatch({
    type: GET_RACUNI,
    payload: res.data,
  });
};

export const getRacunById = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/racunZaOsiguranje/findId/${id}`);
    dispatch({
      type: GET_RACUN,
      payload: res.data,
    });
  } catch (error) {
    history.push("/racunList");
  }
};

export const getRacun = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/racunZaOsiguranje/${id}`);
    dispatch({
      type: GET_RACUNUP,
      payload: res.data,
    });
  } catch (error) {
    history.push("/racunList");
  }
};

export const deleteRacun = (id, history) => async (dispatch) => {
  try {
  if (window.confirm("Da li zaista zelite da obrisete izabrani racun?")) {
    const res = await axios.delete(`/api/racunZaOsiguranje/delete/${id}`);
    dispatch({
      type: DELETE_RACUN,
      payload: res.data,
    });
  }
} catch (error) {
  window.confirm("Ne mozete da obrisete racun koji je vezan za uplatnicu!");
}
};