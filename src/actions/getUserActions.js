/* eslint-disable import/prefer-default-export */
import { FIRST_NAME, LOAD_INITIAL_DATA, SNACKBAR_STATUS } from "./types"

import axios from "axios"
// const pick = require("lodash.pick")
// const map = require("lodash.map")
// const partialRight = require("lodash.partialright")

const headers = {
  "Content-Type": "application/json",
}

export const handleSnackBarStatus = bool => {
  return {
    type: SNACKBAR_STATUS,
    payload: bool,
  }
}

export const loadInitialData = () => async dispatch => {
  const url = ""
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: LOAD_INITIAL_DATA,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log("Error occured while fetching data from API")
    })
}

export const handleFirstNameChange = firstname => {
  return {
    type: FIRST_NAME,
    payload: firstname,
  }
}
