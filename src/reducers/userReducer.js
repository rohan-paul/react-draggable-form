import {
  FIRST_NAME,
  SNACKBAR_STATUS,
  LOAD_INITIAL_DATA,
  SUBMIT_CHANGED_ORDER,
} from "../actions/types"

const initialState = {
  // initialLoadedData: list,
  initialLoadedData: [],
  chnangedOrderData: [],
}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case SNACKBAR_STATUS:
      return {
        ...state,
        snackbar: actions.payload,
      }

    case LOAD_INITIAL_DATA:
      console.log("ACTIONS RECD IN REDUCER", JSON.stringify(actions.payload))
      return {
        ...state,
        initialLoadedData: actions.payload,
      }

    case SUBMIT_CHANGED_ORDER:
      console.log("ACTIONS RECD IN REDUCER", JSON.stringify(actions.payload))
      return {
        ...state,
        chnangedOrderData: actions.payload,
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
