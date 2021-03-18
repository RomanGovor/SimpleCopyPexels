import { put, takeEvery, call } from 'redux-saga/effects';
import { photoAPI } from '../../api/api';
import { photoEditing } from '../../utils/photoEditing';
import {
  actionsCategories,
  initialState,
  CATEGORIES_ASYNC_UPDATE_ARRAY_PHOTOS,
  ActionsType,
} from '../categoryReducer';

function* updateArrayPhotosWorker(action: ActionsType): any {
  if (action.type === CATEGORIES_ASYNC_UPDATE_ARRAY_PHOTOS) {
    const { category, page } = action;
    const curatedPageIndex = initialState.photoPageIndex;

    if (page !== curatedPageIndex && category) {
      const data = yield call(photoAPI.getCategoryPhotos, category, page);
      if (data) {
        const photos = yield photoEditing(data);
        yield put(actionsCategories.updateArrayPhotos(photos));
        yield put(actionsCategories.setCuratedPageIndex(page));
      }
    }
  }
}

function* categoryPageWatcher() {
  yield takeEvery(CATEGORIES_ASYNC_UPDATE_ARRAY_PHOTOS, updateArrayPhotosWorker);
}

export default categoryPageWatcher;
