import { register } from 'use-async-ops'

import { handleFetch } from '../utils/fetch'
import * as asyncOpNames from '../constants/asyncOpNames'
import mocks from './mock'

const URL = 'http://127.0.0.1:5000'

const SCRYFALL = 'https://api.scryfall.com'

const defaultOptions = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("token") },
}

const getTokenOptions = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
}

const mtgApiService = handleFetch((path, options) => window.fetch(URL + path, options))

const scryfallApiService = handleFetch((path, options) => window.fetch(SCRYFALL + path, options))

const registerService = (code, service) => register(code, service, { mock: mocks[code] })

const percentEncoding = (name) => "%21%22" + name.replace(/ /g, "%20") + "%22"

registerService(asyncOpNames.POST_LIBRARY, (data) => mtgApiService('/library', {
  ...defaultOptions,
  method: 'POST',
  body: JSON.stringify(data)
}))

registerService(asyncOpNames.GET_LIBRARY, () => mtgApiService('/library', {
  ...defaultOptions,
  method: 'GET'
}))

registerService(asyncOpNames.DELETE_CARD, id => mtgApiService('/library', {
  ...defaultOptions,
  method: 'DELETE',
  body: JSON.stringify(id)
}))

registerService(asyncOpNames.SCRYFALL_AUTOCOMPLETE, name => scryfallApiService('/cards/autocomplete?q=' + name, {
  ...defaultOptions,
  method: 'GET'
}))

registerService(asyncOpNames.SCRYFALL_GET_CARD, (id) => scryfallApiService('/cards/' + id, {
  ...defaultOptions,
  method: 'GET'
}))

registerService(asyncOpNames.SCRYFALL_GET_CARDS, (name) => scryfallApiService('/cards/search?unique=prints&order=released&q=' + percentEncoding(name), {
  ...defaultOptions,
  method: 'GET'
}))

registerService(asyncOpNames.GET_TOKEN, (data) => mtgApiService('/token', {
  ...getTokenOptions,
  method: 'POST',
  body: JSON.stringify(data)
}))

registerService(asyncOpNames.GET_USERNAME, () => mtgApiService('/token', {
  ...defaultOptions,
  method: 'GET'
}))