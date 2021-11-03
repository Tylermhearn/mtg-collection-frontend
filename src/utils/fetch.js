export const defaultOptions = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  credentials: 'include'
}

export const handleFetch = fetcher => async (...args) => {
  const response = await fetcher(...args)
  const responseObj = await deserializeJsonResponse(response)

  if (response.status >= 400) {
    responseObj.code = responseObj.code || response.status
    responseObj.values = responseObj.values || []
    throw responseObj
  }

  return responseObj
}

export const deserializeJsonResponse = async response => {
  const r = await response.text()
  if (!r) {
    return null
  } else {
    try {
      return JSON.parse(r)
    } catch (err) {
      return {
        code: 'ERROR',
        message: r
      }
    }
  }
}
