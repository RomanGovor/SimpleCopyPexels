import { call, put, takeEvery } from 'redux-saga/effects';
import { wordsAPI } from '../../api/api';
import { getRandomArray } from '../../utils/common';
import { actionsCommon, ActionsType, ASYNC_SET_SUGGESTION_WORDS } from '../commonReducer';

function getWords(data: any): Array<string> {
  const arr: Array<string> = data.data.results.data;
  const filterArr = arr.filter((el) => !el.includes(' '));
  const wordsArr = <Array<string>>getRandomArray(filterArr.length, 10, filterArr);
  return wordsArr;
}

function* setSuggestionWords(action: ActionsType): any {
  if (action.type === ASYNC_SET_SUGGESTION_WORDS) {
    const { value } = action;

    if (value && value.trim().length !== 0) {
      const data = yield call(wordsAPI.getArrayWord, value);
      const words = yield getWords(data);
      yield put(actionsCommon.setSuggestionWords(words));
    }
  }
}

function* commonWatcher() {
  yield takeEvery(ASYNC_SET_SUGGESTION_WORDS, setSuggestionWords);
}

export default commonWatcher;
