import {InferActionsTypes, BaseThunkType} from './store';
import {IHeaderContentItem, PhotoCardType} from '../types/commonTypes';
import defaultHeaderImage from '../assets/images/default-header-bg.jpeg';
import {isUniquePhoto} from "../utils/photoEditing";

export type ThunkType = BaseThunkType<ActionsType>

export const ASYNC_MAIN_UPDATE_ARRAY_PHOTOS = 'MAIN/ASYNC_SET_CURATED_PAGE_INDEX';
export const ASYNC_MAIN_UPDATE_HEADER_PHOTO = 'MAIN/ASYNC_UPDATE_HEADER_PHOTO';

export const initialState = {
    photos: [] as Array<PhotoCardType>,
    maxCountOfColumns: 3,
    headerPhoto: {
        src: defaultHeaderImage,
        phNames: 'Nothing ahead',
        phLink: 'https://www.pexels.com/@kira-schwarz'
    } as PhotoCardType,
    recommendCategories: [] as Array<IHeaderContentItem>,
    curatedPageIndex: 0 as number
};

export const actions = {
    addPostActionCreator: (phLink: string, phPhotoLink: string, src: string, phNames: string) =>
        ({type: 'MAIN/ADD_PHOTO_CARD', phNames, phPhotoLink, phLink, src} as const),
    setHeaderPhoto: (phLink: string, src: string, phNames: string) =>
        ({type: 'MAIN/UPDATE_HEADER_PHOTO', phNames, phLink, src} as const),
    asyncSetHeaderPhoto: () =>
        ({type: ASYNC_MAIN_UPDATE_HEADER_PHOTO} as const),
    updateArrayPhotos: (photos: Array<PhotoCardType>) =>
        ({type: 'MAIN/UPDATE_ARRAY_PHOTOS', photos} as const),
    asyncUpdateArrayPhotos: (page: number) =>
        ({type: ASYNC_MAIN_UPDATE_ARRAY_PHOTOS, page} as const),
    setRecommendCategories: (categories: Array<IHeaderContentItem>) =>
        ({type: 'MAIN/SET_RECOMMEND_CATEGORIES', categories} as const),
    setCuratedPageIndex: (page: number) =>
        ({type: 'MAIN/SET_CURATED_PAGE_INDEX', page} as const)
}

export type InitialStateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actions>

const homeReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'MAIN/ADD_PHOTO_CARD': {
            const newPhoto = {
                phLink: action.phLink,
                phPhotoLink: action.phLink,
                phNames: action.phNames,
                src: action.src
            } as PhotoCardType;
            return {
                ...state,
                photos: [...state.photos, newPhoto],
            };
        }
        case 'MAIN/UPDATE_HEADER_PHOTO': {
            const newHeaderPhoto = {
                phLink: action.phLink,
                phNames: action.phNames,
                src: action.src
            } as PhotoCardType;
            return {
                ...state,
                headerPhoto: newHeaderPhoto
            };
        }
        case 'MAIN/UPDATE_ARRAY_PHOTOS': {
            const isUnique = isUniquePhoto(state.photos[state.photos.length - 1], action.photos[action.photos.length - 1]);
            if(isUnique) {
                return {
                    ...state,
                    photos: [...state.photos, ...action.photos],
                };
            }
            return state;
        }
        case 'MAIN/SET_RECOMMEND_CATEGORIES': {
            return {
                ...state,
                recommendCategories: [...action.categories]
            };
        }
        case 'MAIN/SET_CURATED_PAGE_INDEX': {
            initialState.curatedPageIndex = action.page;

            return {
                ...state,
                curatedPageIndex: action.page
            };
        }
        default:
            return state;
    }
}

export default homeReducer;
