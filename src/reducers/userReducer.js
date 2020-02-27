import { FIRST_NAME, SNACKBAR_STATUS } from "../actions/types"

const initialState = {
  first_name: "paul",
}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case SNACKBAR_STATUS:
      console.log("SNACKBAR COMING TO REDUCER ", actions.payload)
      return {
        ...state,
        snackbar: actions.payload,
      }

    case FIRST_NAME:
      return {
        ...state,
        first_name: actions.payload,
      }

    default:
      return state
  }
}
