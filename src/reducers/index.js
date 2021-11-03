import { combineReducers } from "redux";
import { reducer as asyncops } from 'use-async-ops-redux'
import cardsReducer from './cards'
import token from './auth'


const rootReducer = combineReducers({
  asyncops,
  cardsReducer,
  token
});

export default rootReducer;
