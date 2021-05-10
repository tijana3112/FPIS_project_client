import axios from "axios";
import {
  GET_UPLATNICE
} from "./types";

export const getUplatnice = () => async (dispatch) => {
    const res = await axios.get("/api/uplatnicaZaOsiguranje/findAll");
    dispatch({
      type: GET_UPLATNICE,
      payload: res.data,
    });
  };

export const getUplatniceByIdSvrha = (id, svrha, history) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/uplatnicaZaOsiguranje/find/${id}/${svrha}`);
        dispatch({
            type: GET_UPLATNICE,
            payload: res.data,
        });
    } catch (error) {
    history.push("/addObavestenje");
    }
  
};

export const getUplatniceById = (id, history) => async (dispatch) => {
  try {
      const res = await axios.get(`/api/uplatnicaZaOsiguranje/findId/${id}`);
      dispatch({
          type: GET_UPLATNICE,
          payload: res.data,
      });
  } catch (error) {
  history.push("/addObavestenje");
  }

};

export const getUplatniceBySvrha = (svrha, history) => async (dispatch) => {
  try {
      const res = await axios.get(`/api/uplatnicaZaOsiguranje/findS/${svrha}`);
      dispatch({
          type: GET_UPLATNICE,
          payload: res.data,
      });
  } catch (error) {
  history.push("/addObavestenje");
  }

};