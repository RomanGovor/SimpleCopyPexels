import {InferActionsTypes, BaseThunkType} from './store';
import {PhotoCardType} from '../types/commonTypes';
import {photoAPI} from '../api/api';
import {isUniquePhoto, photoEditing} from "../utils/photoEditing";

type ThunkType = BaseThunkType<ActionsType>

const initialState = {
    photos: [] as Array<PhotoCardType>,
    maxCountOfColumns: 3,
    photoPageIndex: 0 as number,
    title: ''
};

export const actionsCategories = {
    updateArrayPhotos: (photos: Array<PhotoCardType>) =>
        ({type: 'CATEGORIES/UPDATE_ARRAY_PHOTOS', photos} as const),
    setCuratedPageIndex: (page: number) =>
        ({type: 'CATEGORIES/SET_PAGE_INDEX', page} as const),
    setCategoryTitle: (title: string) =>
        ({type: 'CATEGORIES/SET_CATEGORY_TITLE', title} as const),
    zeroing: () =>
        ({type: 'CATEGORIES/ZEROING_STATE'} as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsCategories>

const categoryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CATEGORIES/UPDATE_ARRAY_PHOTOS': {
            const isUnique = isUniquePhoto(state.photos[state.photos.length - 1], action.photos[action.photos.length - 1]);
            if(isUnique) {
                return {
                    ...state,
                    photos: [...state.photos, ...action.photos],
                };
            }
            return state;
        }
        case 'CATEGORIES/SET_PAGE_INDEX': {
            initialState.photoPageIndex = action.page;

            return {
                ...state,
                photoPageIndex: action.page
            };
        }
        case 'CATEGORIES/SET_CATEGORY_TITLE': {
            // initialState.title = action.title;
            return {
                ...state,
                title: action.title
            };
        }
        case 'CATEGORIES/ZEROING_STATE': {
            return {
                ...state,
                photoPageIndex: 0,
                title: '',
                photos: []
            };
        }
        default:
            return state;
    }
}

export const updateCategoriesArrayPhotos = (page: number, category: string): ThunkType => async (dispatch) => {
    const curatedPageIndex = initialState.photoPageIndex;

    if (page !== curatedPageIndex) {
        const data = await photoAPI.getCategoryPhotos(category, page);

        if (Boolean(data)) {
            const photos = photoEditing(data);
            dispatch(actionsCategories.updateArrayPhotos(photos));
            dispatch(actionsCategories.setCuratedPageIndex(page));
        }
    }
}

export default categoryReducer;
