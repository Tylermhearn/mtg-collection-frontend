import { reducerHelpers } from 'use-async-ops-redux'
import * as serviceTypes from '../../constants/asyncOpNames'

const { isAsyncComplete } = reducerHelpers

const initialState = []

const complete = (action) => action.response.data.slice(0, 9)

const cardSearch = (state = initialState, action) => {
  if (isAsyncComplete(serviceTypes.SCRYFALL_AUTOCOMPLETE)(action)) return complete(action, state)
  return state
}

export default cardSearch
