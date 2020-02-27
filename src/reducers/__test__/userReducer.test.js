import reducer from '../userReducer'
import expect from 'expect'
import * as actions from '../../actions/getUserActions'
import {
  LOADING,
  LOAD_MOST_POPULAR_USERS,
  ERROR_WHILE_FETCHING_INITIAL_TABLE,
  CITY_TO_SEARCH,
  SNACKBAR_STATUS,
} from '../../actions/types'

const initialState = {
  loading: false,
  error_while_fetching_initial_table: false,
  error_while_fetching_initial_data: false,
  city_to_search: '',
  snackbar: false,
  topTenUsersInCity: [],
  totalNoOfUsersFromAPI: 0,
}

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SNACKBAR_STATUS', () => {
    const snackbarAction = {
      type: SNACKBAR_STATUS,
      payload: true,
    }
    expect(reducer({}, snackbarAction)).toEqual({ snackbar: true })
  })

  it('should handle ERROR_WHILE_FETCHING_INITIAL_TABLE', () => {
    const errorWhileFetchingTableAction = {
      type: ERROR_WHILE_FETCHING_INITIAL_TABLE,
      payload: true,
    }
    expect(reducer({}, errorWhileFetchingTableAction)).toEqual({
      snackbar: true,
    })
  })

  it('should handle CITY_TO_SEARCH', () => {
    const cityToSearchAction = {
      type: CITY_TO_SEARCH,
      payload: 'Bengaluru',
    }
    expect(reducer({}, cityToSearchAction)).toEqual({
      city_to_search: 'Bengaluru',
    })
  })
})
