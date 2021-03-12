import {InferActionsTypes, BaseThunkType} from './store';
import {PhotoCardType} from "../types/commonTypes";
import {photoAPI} from "../api/api";
import {getPhotoByData} from "../utils/photoEditing";


type ThunkType = BaseThunkType<ActionsType>

export const initialState = {
    photos: [] as Array<PhotoCardType>,
    maxCountOfColumns: 3
};

export const actionsCollections = {
    addCollectionsPhoto: (photo: PhotoCardType) =>
        ({type: 'COLLECTIONS/SET_COLLECTIONS_PHOTO_ELEM', photo} as const),
    deleteCollectionsPhoto: (id: number) =>
        ({type: 'COLLECTIONS/DELETE_COLLECTIONS_PHOTO_ELEM', id} as const),
    zeroingData: () =>
        ({type: 'COLLECTIONS/ZEROING_DATA'} as const),
}


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsCollections>

const collectionsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'COLLECTIONS/SET_COLLECTIONS_PHOTO_ELEM': {
            const photos = [...state.photos];
            photos.push(action.photo);

            return {
                ...state,
                photos: [...photos]
            };
        }
        case 'COLLECTIONS/DELETE_COLLECTIONS_PHOTO_ELEM': {
            const photos = [...state.photos].filter((photo) => {
                return photo.photoId !== action.id;
            });

            return {
                ...state,
                photos: [...photos]
            };
        }
        case 'COLLECTIONS/ZEROING_DATA': {
            return {
                ...state,
                photos: []
            };
        }
        default:
            return state;
    }
}

export const setCollectionPhotos = (arrayId: Array<number>): ThunkType => async (dispatch) => {
    if (arrayId && arrayId.length !== 0) {
        for (let i = 0; i < arrayId.length; i++) {
            const data = await photoAPI.getPhotoBuId(arrayId[i]);

            if (Boolean(data)) {
                // @ts-ignore
                const photo = getPhotoByData(data);
                dispatch(actionsCollections.addCollectionsPhoto(photo));
            }
        }
    }
}

export default collectionsReducer;
