import { registerMockFn } from '../mock/tools/registry'
import { collectionDb } from './index'

const getLibrary = () => {
    const library = collectionDb.list()
    return library
}

registerMockFn("GET_LIBRARY", getLibrary)
