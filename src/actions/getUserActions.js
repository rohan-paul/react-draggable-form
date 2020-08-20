/* eslint-disable import/prefer-default-export */
import {
  FIRST_NAME,
  LOAD_INITIAL_DATA,
  SNACKBAR_STATUS,
  SUBMIT_CHANGED_ORDER,
} from "./types"

import axios from "axios"
// const pick = require("lodash.pick")
// const map = require("lodash.map")
// const partialRight = require("lodash.partialright")

const headers = {
  "Content-Type": "application/json",
}

// Functiion to add an ID to each item of the array of objects, received from API call, as the raw data received from the API does not have an id field
const addId = arr => {
  return arr.map(function(obj, index) {
    return Object.assign({}, obj, { id: index })
  })
}

export const handleSnackBarStatus = bool => {
  return {
    type: SNACKBAR_STATUS,
    payload: bool,
  }
}

export const loadInitialData = () => async dispatch => {
  const url = "http://54.193.89.54:8230/readFields"
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: LOAD_INITIAL_DATA,
        payload: addId(res.data),
      })
    })
    .catch(err => {
      console.log("Error occurred while fetching initial data from API")
    })
}

export const submitChangedOrder = reqBody => async dispatch => {
  // const url = "http://54.193.89.54:8230/saveFields"
  const url = "https://demo1107746.mockable.io/enhancio-saveFields"

  // Including the below line of code only to check / and to show to Ajay and Team, that the correct modified order of the form-fields are being sent to backend (because I had to change to mockable.io as the Real Backend API was not accepting axios GET / POST request from the deployed site at Netlify)
  console.log("Reqeust Body sent to Backend ", reqBody)

  axios
    .post(url, reqBody)
    .then(res => {
      dispatch({
        type: SUBMIT_CHANGED_ORDER,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log("Error occurred while submitting changed orders ")
    })
}

export const handleFirstNameChange = firstname => {
  return {
    type: FIRST_NAME,
    payload: firstname,
  }
}
