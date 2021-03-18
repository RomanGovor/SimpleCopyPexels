import { AppStateType } from './store';

const selectCategoryTitle = (state: AppStateType): string => {
  return state.categoryPage.title;
};

export default selectCategoryTitle;
