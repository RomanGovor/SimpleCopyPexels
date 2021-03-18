import { all } from 'redux-saga/effects';
import categoryPageWatcher from './categoryPageSaga';
import collectionsPageWatcher from './collectionsPageSaga';
import commonWatcher from './commonSaga';
import homePageWatcher from './homePageSaga';

function* rootWatcher() {
  yield all([homePageWatcher(), commonWatcher(), collectionsPageWatcher(), categoryPageWatcher()]);
}

export default rootWatcher;
