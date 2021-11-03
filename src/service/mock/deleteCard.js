import { registerMockFn } from '../mock/tools/registry'
import { collectionDb } from './index'

const deleteCard = (id) => {
  collectionDb.remove(id)
  return id
}

registerMockFn("DELETE_CARD", deleteCard)
