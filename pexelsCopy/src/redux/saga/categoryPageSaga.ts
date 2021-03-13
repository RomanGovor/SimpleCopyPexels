import {put, takeEvery, call} from 'redux-saga/effects'
import {photoAPI} from "../../api/api";
import {photoEditing} from "../../utils/photoEditing";
import {actionsCategories, initialState, CATEGORIES_ASYNC_UPDATE_ARRAY_PHOTOS, ActionsType} from "../categoryReducer";

function* updateArrayPhotosWorker(action: ActionsType) {
    // @ts-ignore
    const {category, page} = action;
    const curatedPageIndex = initialState.photoPageIndex;

    if (page !== curatedPageIndex && category) {
        // @ts-ignore
        const data = yield call(photoAPI.getCategoryPhotos,category,page);
        if (Boolean(data)) {
            // @ts-ignore
            const photos = yield photoEditing(data);
            yield put(actionsCategories.updateArrayPhotos(photos))
            yield put(actionsCategories.setCuratedPageIndex(page));
        }
    }
}

export function* categoryPageWatcher() {
    // @ts-ignore
    yield takeEvery(CATEGORIES_ASYNC_UPDATE_ARRAY_PHOTOS, updateArrayPhotosWorker);
}
