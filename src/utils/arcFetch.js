import { isArray } from 'lodash'

export const defaultOptions = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  credentials: 'include'
}

export const catchHttpStatusErrors = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = {
      code: response.statusText,
      values: [response.status]
    }
    throw error
  }
}

export const throwArcExceptionErrors = response => {
  if (!response || !response.code) return
  const error = {
    code: response.code || '',
    message: response.message || '',
    values: response.values || []
  }
  throw error
}

export const catchXmlErrors = response => {
  if (response.xmlerror) {
    const cause = response.xmlerror.cause && response.xmlerror.cause.message
    const message = cause || response.xmlerror.message
    const error = {
      code: response.xmlerror.number.toString(),
      message: message,
      values: [message, response.xmlerror.source]
    }
    throw error
  }
  return response
}

export const handleFetch = fetcher => async (...args) => {
  const response = await fetcher(...args)

  if (response.status >= 400) {
    const error = await deserializeJsonResponse(response)
    error.code = error.code || response.status
    error.values = error.values || []
    throw error
  }

  return deserializeJsonResponse(response)
}

export const handleActivationFetch = fetcher => async (...args) => {
  const response = await fetcher(...args)

  if (response.status >= 400) {
    const error = await deserializeJsonResponse(response)
    error.code = error.code || response.status
    error.values = error.values || []
    throw error
  }

  return deserializeJsonResponse(response)
}

export const deserializeJsonResponse = async response => {
  const responseBody = await response.text()
  if (responseBody === '' || !responseBody) {
    return responseBody
  }

  try {
    return JSON.parse(responseBody)
  } catch (ex) {
    const error = {}
    error.code = ex.message
    error.values = []
    throw error
  }
}

export const catchEltBusinessError = response => {
  if (response && response.errors) {
    const responseError = getObject(response.errors).error
    const error = new Error(responseError.code)
    error.response = response
    error.code = responseError.code || ''
    error.message = responseError.code || ''
    error.values = [getObject(getObject(responseError.values).a).string] || []
    throw error
  }
  return response
}

const getObject = arrayOrObject => isArray(arrayOrObject) ? arrayOrObject[0] : arrayOrObject
