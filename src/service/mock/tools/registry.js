import mimicService from './mimicService'

const MOCKS = {}

export const registerMockFn = (asyncOpName, fn) => {
  if (MOCKS[asyncOpName]) throw new Error('mock already registered for: ', asyncOpName)
  MOCKS[asyncOpName] = mimicService(fn)
}

export const get = () => MOCKS
