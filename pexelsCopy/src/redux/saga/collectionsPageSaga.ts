import { put, takeEvery, call } from 'redux-saga/effects';
import { photoAPI } from '../../api/api';
import { getPhotoByData } from '../../utils/photoEditing';
import {
  actionsCollections,
  ActionsType,
  COLLECTIONS_ASYNC_SET_COLLECTIONS_PHOTO,
} from '../collectionsReducer';

function* setCollectionPhotos(action: ActionsType): any {
  if (action.type === COLLECTIONS_ASYNC_SET_COLLECTIONS_PHOTO) {
    const { arrayId } = action;

    if (arrayId && arrayId.length !== 0) {
      for (let i = 0; i < arrayId.length; i += 1) {
        const data = yield call(photoAPI.getPhotoBuId, arrayId[i]);
        if (data) {
          const photo = yield getPhotoByData(data);
          yield put(actionsCollections.addCollectionsPhoto(photo));
        }
      }
    }
  }
}

function* collectionsPageWatcher() {
  yield takeEvery(COLLECTIONS_ASYNC_SET_COLLECTIONS_PHOTO, setCollectionPhotos);
}

export default collectionsPageWatcher;
