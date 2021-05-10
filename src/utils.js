import moment from "moment";
import {
  BACKEND_MOMENT_DATE_FORMAT,
  FRONTEND_MOMENT_DATE_FORMAT,
  BACKEND_MOMENT_DATE_FORMAT1,
  FRONTEND_MOMENT_DATE_FORMAT1,
} from "./constants";
import React from "react";

export const formatDateFromBackend = (date) =>
  moment(date, BACKEND_MOMENT_DATE_FORMAT).format(FRONTEND_MOMENT_DATE_FORMAT);

export const dateFromBackendToJsDate = (date) => {
  const momentDate = moment(date, BACKEND_MOMENT_DATE_FORMAT);
  return momentDate.isValid() ? momentDate.toDate() : null;
};

export const adjustTimezoneDifference = (date) => {
  const wrapper = moment.utc(date).local();
  const adjusted = new Date(wrapper.format(BACKEND_MOMENT_DATE_FORMAT));
  return adjusted;
};

export const formatDateFromBackend1 = (date) =>
  moment(date, BACKEND_MOMENT_DATE_FORMAT1).format(
    FRONTEND_MOMENT_DATE_FORMAT1
  );

export const dateFromBackendToJsDate1 = (date) => {
  const momentDate = moment(date, BACKEND_MOMENT_DATE_FORMAT1);
  return momentDate.isValid() ? momentDate.toDate() : null;
};

export const adjustTimezoneDifference1 = (date) => {
  const wrapper = moment.utc(date).local();
  const adjusted = new Date(wrapper.format(BACKEND_MOMENT_DATE_FORMAT1));
  return adjusted;
};

export const handleUrlAccessErrors = (errors) => {
  if (errors.objectNotFound) {
    return (
      <div className="alert alert-danger text text-center m-auto" role="alert">
        {errors.objectNotFound}
      </div>
    );
  } else if (errors.objectUnauthorizedAccess) {
    return (
      <div className="alert alert-danger text text-center m-auto" role="alert">
        {errors.objectUnauthorizedAccess}
      </div>
    );
  }
};

export const setMessage = (msg, tagId, msgId) => async (dispatch) => {
  document.querySelector(tagId).classList.add("alert-danger");
  document.querySelector(msgId).style.color = "red";
  document.querySelector(msgId).innerHTML = "<p>" + msg + "</p>";

  setTimeout(function () {
    if (document.querySelector(msgId) != null) {
      document.querySelector(msgId).innerHTML = "";
      document.querySelector(msgId).classList.remove("alert-danger");
      document.querySelector(tagId).classList.remove("alert-danger");
    }
  }, 3000);
};
