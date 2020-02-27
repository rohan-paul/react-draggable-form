import {
  FIRST_NAME,
  SNACKBAR_STATUS,
  LOAD_INITIAL_DATA,
} from "../actions/types"

const list = [
  {
    id: 0,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "First Name",
    fieldType: "TXT",
    mandatory: "Y",
    order: 1,
    expectedValues: [],
  },
  {
    id: 1,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Last Name",
    fieldType: "TXT",
    mandatory: "N",
    order: 2,
    expectedValues: [],
  },
  {
    id: 2,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Email Address",
    fieldType: "TXT",
    mandatory: "Y",
    order: 3,
    expectedValues: [],
  },
  {
    id: 3,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Title",
    fieldType: "TXT",
    mandatory: "N",
    order: 4,
    expectedValues: [],
  },
  {
    id: 4,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Company Name",
    fieldType: "SS",
    mandatory: "Y",
    order: 5,
    expectedValues: ["Enhancio", "Infosys", "Microsoft"],
  },
  {
    id: 5,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Job Level",
    fieldType: "SS",
    mandatory: "Y",
    order: 6,
    expectedValues: ["Manager", "Engineer"],
  },
  {
    id: 6,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Job Function",
    fieldType: "SS",
    mandatory: "Y",
    order: 7,
    expectedValues: ["Designer", "Developer"],
  },
  {
    id: 7,
    createdOn: "2020-02-24T13:20:47.500+0000",
    fieldName: "Company Size",
    fieldType: "MS",
    mandatory: "Y",
    order: 8,
    expectedValues: ["10 -20", "20-30", "30-100"],
  },
]

const initialState = {
  // initialLoadedData: list,
  initialLoadedData: [],
  first_name: "paul",
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

    case FIRST_NAME:
      return {
        ...state,
        first_name: actions.payload,
      }

    default:
      return state
  }
}
