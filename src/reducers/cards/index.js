import { combineReducers } from 'redux'

import library from './library'
import cardSearch from './cardSearch'

const cardsReducer = combineReducers({
    library,
    cardSearch
})

export default cardsReducer
