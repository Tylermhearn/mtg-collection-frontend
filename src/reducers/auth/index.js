import { reducerHelpers } from 'use-async-ops-redux'
import * as serviceTypes from '../../constants/asyncOpNames'

const { isAsyncComplete } = reducerHelpers

const initialState = null

const complete = (action) => {
  if (action.response.status != 200) return null
  return (action.response.token)
}

const token = (state = initialState, action) => {
  if (isAsyncComplete(serviceTypes.GET_TOKEN)(action)) return complete(action, state)
  return state
}

export default token
