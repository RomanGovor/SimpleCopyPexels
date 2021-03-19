import { put, takeEvery, call } from 'redux-saga/effects';
import { Photos } from 'pexels';
import { SagaIterator } from 'redux-saga';
import {
  actions,
  ActionsType,
  ASYNC_MAIN_UPDATE_ARRAY_PHOTOS,
  ASYNC_MAIN_UPDATE_HEADER_PHOTO,
  initialState,
} from '../homeReducer';
import { photoAPI } from '../../api/api';
import { photoEditing } from '../../utils/photoEditing';
import { getRandomInt } from '../../utils/common';
import { PhotoCardType } from '../../types/commonTypes';

function getHeaderPhoto(data: Photos) {
  let src;
  if (data) {
    const indexPhoto = getRandomInt(data?.photos.length);
    const photo = data?.photos[indexPhoto];
    const photographerUrl = photo?.photographer_url || initialState.headerPhoto.phLink;
    const photographer = photo?.photographer || initialState.headerPhoto.phNames;

    try {
      src =
        photo.src.landscape !== undefined || photo.src.original !== undefined
          ? photo.src.landscape || photo.src.original
          : initialState.headerPhoto.src;
    } catch (err) {
      console.log(err);
      src = initialState.headerPhoto.src;
    }

    return { photographerUrl, photographer, src };
  }

  const photographerUrl = initialState.headerPhoto.phLink;
  const photographer = initialState.headerPhoto.phNames;
  src = initialState.headerPhoto.src;

  return { photographerUrl, photographer, src };
}

function* updateArrayPhotosWorker(action: ActionsType): SagaIterator | PhotoCardType[] {
  if (action.type === ASYNC_MAIN_UPDATE_ARRAY_PHOTOS) {
    const { page } = action;

    const { curatedPageIndex } = initialState;
    if (page && page !== curatedPageIndex) {
      const data = yield call(photoAPI.getCuratedPhoto, page);
      if (data) {
        const photos = yield photoEditing(data);
        yield put(actions.updateArrayPhotos(photos));
        yield put(actions.setCuratedPageIndex(page));
      }
    }
  }
}

function* setHeaderPhoto(): SagaIterator | PhotoCardType {
  const data = yield call(photoAPI.getHeaderPhoto);
  const photo = yield getHeaderPhoto(data);
  yield put(actions.setHeaderPhoto(photo.photographerUrl, photo.src, photo.photographer));
}

function* homePageWatcher() {
  yield takeEvery(ASYNC_MAIN_UPDATE_ARRAY_PHOTOS, updateArrayPhotosWorker);
  yield takeEvery(ASYNC_MAIN_UPDATE_HEADER_PHOTO, setHeaderPhoto);
}

export default homePageWatcher;
