import { enableMock, disableMock } from 'use-async-ops'

import { get } from '../mock/tools/registry'
import createDb from '../mock/tools/createMockServiceDb'
import initializeDbs from './initializeDbs'

import './getLibrary'
import './deleteCard'

export const collectionDb = createDb(window.localStorage)('COLLECTION_DB')

const ENABLED_KEY = 'commissionsDemoModeEnabled'
const COMMISSIONS_TESTING_ENABLED_KEY = 'commissionsTestingEnabled'

export const clearDbs = () => {
    collectionDb.clear()
}

export const enable = () => {
    clearDbs()
    enableMock()
    window.localStorage.setItem(ENABLED_KEY, 'true')
    window.localStorage.setItem(COMMISSIONS_TESTING_ENABLED_KEY, 'false')
    initializeDbs()
    window.location.reload()
}

export const disable = () => {
    disableMock()
    clearDbs()
    window.localStorage.removeItem(ENABLED_KEY)
    window.location.reload()
}

export const isEnabled = () => window.localStorage.getItem(ENABLED_KEY) === 'true'

window.DEMO_MODE = { enable, disable, isEnabled, clearDbs }

export default get()
