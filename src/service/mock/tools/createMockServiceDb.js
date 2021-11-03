import * as jiff from 'jiff'

const createMockServiceDb = browserStorage => DB_NAME => {
  let entries = []

  let autoSave = true

  const setAutoSave = b => (autoSave = b)

  const save = () => {
    browserStorage.setItem(DB_NAME, JSON.stringify(entries))
  }

  const load = () => {
    entries = []
    const json = browserStorage.getItem(DB_NAME)
    if (json) {
      entries = JSON.parse(json)
    }
  }

  const count = () => entries.length

  const add = entry => {
    entries = [...entries.filter(e => e.id !== entry.id), entry]
    if (autoSave) save()
    return { id: entry.id }
  }

  const remove = id => {
    entries = entries.filter(e => e.id !== id)
    if (autoSave) save()
  }

  const get = id => entries.find(e => e.id === id)

  const patch = (id, jsonPatch) => {
    const prev = get(id) || { id }
    add(jiff.patch(jsonPatch, prev))
  }

  const clear = () => {
    entries = []
    browserStorage.removeItem(DB_NAME)
  }

  const list = () => [...entries]

  load()

  return { save, add, patch, get, clear, count, setAutoSave, load, remove, list }
}

export default createMockServiceDb
