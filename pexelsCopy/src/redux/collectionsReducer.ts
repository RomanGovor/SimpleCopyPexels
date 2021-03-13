import {InferActionsTypes, BaseThunkType} from './store';
import {PhotoCardType} from "../types/commonTypes";

export const COLLECTIONS_ASYNC_SET_COLLECTIONS_PHOTO = 'COLLECTIONS/ASYNC_SET_COLLECTIONS_PHOTO';

// type ThunkType = BaseThunkType<ActionsType>

export const initialState = {
    photos: [] as Array<PhotoCardType>,
    maxCountOfColumns: 3
};

export const actionsCollections = {
    addCollectionsPhoto: (photo: PhotoCardType) =>
        ({type: 'COLLECTIONS/SET_COLLECTIONS_PHOTO_ELEM', photo} as const),
    asyncAddCollectionsPhoto: (arrayId: Array<number>) =>
        ({type: COLLECTIONS_ASYNC_SET_COLLECTIONS_PHOTO, arrayId} as const),
    deleteCollectionsPhoto: (id: number) =>
        ({type: 'COLLECTIONS/DELETE_COLLECTIONS_PHOTO_ELEM', id} as const),
    zeroingData: () =>
        ({type: 'COLLECTIONS/ZEROING_DATA'} as const),
}


export type InitialStateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actionsCollections>

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

export default collectionsReducer;
