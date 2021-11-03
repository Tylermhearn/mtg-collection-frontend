import { createSelector } from 'reselect'

const managersSelector = state => state.cardsReducer.library


export default createSelector(
    managersSelector,
    managers => Object.values(managers)
)
