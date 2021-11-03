import { reducerHelpers } from 'use-async-ops-redux'
import * as serviceTypes from '../../constants/asyncOpNames'

const { isAsyncComplete } = reducerHelpers

const initialState = [{
    cmc: '',
    collector_number: '',
    color_identity: [],
    extras: '',
    id: '',
    imgUri: '',
    language: '',
    name: '',
    oracle_id: '',
    prices: {},
    quantity: '',
    scryfall_id: '',
    set_code: '',
    set_name: '',
    type_line: '',
    _id: '',
}]

const completeDelete = (action, state) => state.filter(value => {
    return value.id !== action.response
})

const complete = (action) => action.response

const library = (state = initialState, action) => {
    if (isAsyncComplete(serviceTypes.DELETE_CARD)(action)) return completeDelete(action, state)
    if (isAsyncComplete(serviceTypes.GET_LIBRARY)(action)) return complete(action)
    return state
}

export default library
