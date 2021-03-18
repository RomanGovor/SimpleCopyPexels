import { AppStateType } from './store';

const selectCuratedPageIndex = (state: AppStateType): number => {
  return state.homePage.curatedPageIndex;
};

export default selectCuratedPageIndex;
