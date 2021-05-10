import axios from "axios";
import {
  GET_OBAVESTENJA,
  GET_OBAVESTENJE,
  DELETE_OBAVESTENJE,
  GET_ERRORS
} from "./types";

export const createObavestenje = (obavestenje, history) => async (dispatch) => {
  try {
    await axios.post("/api/obavestenjeOOsiguranju/createObavestenje", obavestenje);
    history.push("/obavestenjeList");
    dispatch({
      type: GET_ERRORS,
      payload: {}
  });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
  });
  }
};

export const getObavestenja = () => async (dispatch) => {
  const res = await axios.get("/api/obavestenjeOOsiguranju/findAll");
  dispatch({
    type: GET_OBAVESTENJA,
    payload: res.data,
  });
};

export const getObavestenjeById = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/obavestenjeOOsiguranju/findId/${id}`);
    dispatch({
      type: GET_OBAVESTENJE,
      payload: res.data,
    });
  } catch (error) {
    history.push("/obavestenjeList");
  }
};

export const getObavestenjeBySvrha = (svrha, history) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/obavestenjeOOsiguranju/findS/${svrha}`);
      dispatch({
        type: GET_OBAVESTENJA,
        payload: res.data,
      });
    } catch (error) {
      history.push("/obavestenjeList");
    }
  };

export const deleteObavestenje = (id, history) => async (dispatch) => {
  if (window.confirm("Da li zaista zelite da obrisete izabrano obavestenje?")) {
    const res = await axios.delete(`/api/obavestenjeOOsiguranju/delete/${id}`);
    dispatch({
      type: DELETE_OBAVESTENJE,
      payload: res.data,
    });
  }
};