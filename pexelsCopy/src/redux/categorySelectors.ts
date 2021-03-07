import {AppStateType} from './store';

export const selectCategoryTitle = (state: AppStateType) => {
    return state.categoryPage.title;
}
