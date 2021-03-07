import {AppStateType} from './store';

export const selectCuratedPageIndex = (state: AppStateType) => {
    return state.homePage.curatedPageIndex;
}
