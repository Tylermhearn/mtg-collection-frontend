import { collectionDb } from '.'
import { library } from './tools/mockLibrary'

const initializeDbs = () => {
    for (const card in library) {
        collectionDb.add(library[card])
    }
}

export default initializeDbs
