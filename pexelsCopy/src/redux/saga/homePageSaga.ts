import {put, takeEvery, call} from 'redux-saga/effects'
import {
    actions, ActionsType,
    ASYNC_MAIN_UPDATE_ARRAY_PHOTOS,
    ASYNC_MAIN_UPDATE_HEADER_PHOTO,
    initialState
} from "../homeReducer";
import {photoAPI} from "../../api/api";
import {photoEditing} from "../../utils/photoEditing";
import {getRandomInt} from "../../utils/common";


function getHeaderPhoto(data: any) {
    let src;
    if (Boolean(data)) {
        const indexPhoto = getRandomInt(data?.photos.length);
        const photo = data?.photos[indexPhoto];
        const photographerUrl = photo?.photographer_url || initialState.headerPhoto.phLink;
        const photographer = photo?.photographer || initialState.headerPhoto.phNames;

        try {
            src = (photo.src.landscape !== undefined || photo.src.original !== undefined)
                ? (photo.src.landscape || photo.src.original)
                : initialState.headerPhoto.src;
        } catch (err) {
            console.log(err);
            src = initialState.headerPhoto.src;
        }

        return {photographerUrl, photographer, src};
    }

    const photographerUrl = initialState.headerPhoto.phLink;
    const photographer = initialState.headerPhoto.phNames;
    src = initialState.headerPhoto.src;

    return {photographerUrl, photographer, src};
}

function* updateArrayPhotosWorker(action: ActionsType) {
    // @ts-ignore
    const page = action.page;

    const curatedPageIndex = initialState.curatedPageIndex;
    if (page !== curatedPageIndex) {
        // @ts-ignore
        const data = yield call(photoAPI.getCuratedPhoto, page);
        if (Boolean(data)) {
            // @ts-ignore
            const photos = yield photoEditing(data);
            yield put(actions.updateArrayPhotos(photos))
            yield put(actions.setCuratedPageIndex(page));
        }
    }
}

function* setHeaderPhoto() {
    // @ts-ignore
    const data = yield call(photoAPI.getHeaderPhoto);
    // @ts-ignore
    const photo = yield getHeaderPhoto(data);
    yield put(actions.setHeaderPhoto(photo.photographerUrl, photo.src, photo.photographer));
}

export function* homePageWatcher() {
    // @ts-ignore
    yield takeEvery(ASYNC_MAIN_UPDATE_ARRAY_PHOTOS, updateArrayPhotosWorker);
    yield takeEvery(ASYNC_MAIN_UPDATE_HEADER_PHOTO, setHeaderPhoto);
}

