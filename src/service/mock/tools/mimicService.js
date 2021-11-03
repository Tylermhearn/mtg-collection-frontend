import Chance from 'chance'

const isError = r => r && r.code && r.values

const isPromise = o => o && o.then

const chance = Chance.Chance()

const delay = 300

const mimicService = (service, delayOverride) => (...args) => {
  const baseDelay = delayOverride || delay
  const wait = chance.integer({ min: baseDelay, max: baseDelay * 2 })

  let response
  let exception

  try {
    response = service(...args)
  } catch (err) {
    exception = err
  }

  if (isPromise(response)) return response

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isError(response) || exception) {
        reject(exception || response)
      } else {
        resolve(response)
      }
    }, wait)
  })
}

export default mimicService
