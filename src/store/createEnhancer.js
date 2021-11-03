import { compose, applyMiddleware } from 'redux'
import invariant from 'redux-immutable-state-invariant'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware()

const createMiddlewareEnhancer = () => {
  const middleware = []
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(invariant())
    middleware.push(createLogger({
      level: 'log',
      collapsed: true,
      diff: true
    }))
  }
  middleware.push(sagaMiddleware)
  return applyMiddleware(...middleware)
}

const createEnhancer = () => {
  const enhancers = []
  enhancers.push(createMiddlewareEnhancer())
  return compose(...enhancers)
}

export default createEnhancer
