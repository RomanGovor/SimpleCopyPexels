import {put, takeEvery, call} from 'redux-saga/effects'
import {photoAPI} from "../../api/api";
import {getPhotoByData} from "../../utils/photoEditing";
import {actionsCollections, ActionsType, COLLECTIONS_ASYNC_SET_COLLECTIONS_PHOTO} from "../collectionsReducer";

function* setCollectionPhotos(action: ActionsType) {
    // @ts-ignore
    const arrayId = action.arrayId;

    if (arrayId && arrayId.length !== 0) {
        for (let i = 0; i < arrayId.length; i++) {
            // @ts-ignore
            const data = yield call(photoAPI.getPhotoBuId,arrayId[i]);
            if (Boolean(data)) {
                // @ts-ignore
                const photo = yield getPhotoByData(data);
                yield put(actionsCollections.addCollectionsPhoto(photo));
            }
        }
    }
}

export function* collectionsPageWatcher() {
    // @ts-ignore
    yield takeEvery(COLLECTIONS_ASYNC_SET_COLLECTIONS_PHOTO, setCollectionPhotos);
}
