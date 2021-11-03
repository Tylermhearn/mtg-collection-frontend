import { createStore } from 'redux'
import reducer from '../reducers'
import createEnhancer from './createEnhancer'
import { prependMiddleware } from 'use-async-ops'
import { invoke } from 'use-async-ops/dist/middleware'
import { reduxMiddleware } from 'use-async-ops-redux'
import * as asyncOpNames from '../constants/asyncOpNames'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage: storageSession
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, createEnhancer())
export const persistor = persistStore(store)

prependMiddleware(reduxMiddleware(store.dispatch))

if (process.env.NODE_ENV !== 'production') {
  window.asyncOpNames = asyncOpNames
  window.store = store
  window.invokeService = (name, ...args) => invoke({ options: {}, runId: 1, hookId: 1 })(name, ...args)
}

export default store
