import {all} from 'redux-saga/effects';
import {homePageWatcher} from "./homePageSaga";
import {commonWatcher} from "./commonSaga";
import {categoryPageWatcher } from './categoryPageSaga';
import {collectionsPageWatcher} from "./collectionsPageSaga";

export function* rootWatcher() {
    yield all([homePageWatcher(), commonWatcher(),collectionsPageWatcher(), categoryPageWatcher()]);
}
