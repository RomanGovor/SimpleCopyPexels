import {call, put, takeEvery} from "redux-saga/effects";
import {wordsAPI} from "../../api/api";
import {getRandomArray} from "../../utils/common";
import {actionsCommon, ActionsType, ASYNC_SET_SUGGESTION_WORDS} from "../commonReducer";

function getWords(data: any): Array<string> | void {
    if (Boolean(data)) {
        const arr: Array<string> = data.data.results.data;
        const filterArr = arr.filter((el) => !el.includes(' '));
        const words = getRandomArray(filterArr.length, 10, filterArr);
        return words;
    }
}

function* setSuggestionWords(action: ActionsType) {
    // @ts-ignore
    const value = action.value;

    if (value && value.trim().length !== 0) {
        // @ts-ignore
        const data = yield call(wordsAPI.getArrayWord, value);
        // @ts-ignore
        const words = yield getWords(data);
        yield put(actionsCommon.setSuggestionWords(words));
    }
}

export function* commonWatcher() {
    // @ts-ignore
    yield takeEvery(ASYNC_SET_SUGGESTION_WORDS, setSuggestionWords);
}
