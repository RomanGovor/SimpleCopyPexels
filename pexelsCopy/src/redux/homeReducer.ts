import {InferActionsTypes, BaseThunkType} from './store';
import {IHeaderContentItem, PhotoCardType} from '../types/commonTypes';
import img1 from '../assets/images/defaultImages/image-1.jpeg';
import defaultHeaderImage from '../assets/images/default-header-bg.jpeg';
import {photoAPI} from '../api/api';
import {getRandomInt} from "../utils/common";
import {isUniquePhoto, photoEditing} from "../utils/photoEditing";

type ThunkType = BaseThunkType<ActionsType>

const initialState = {
    photos: [
        {src: img1, phNames: 'kira schwarz', phPhotoLink: 'https://images.pexels.com/users/avatars/616468/kira-schwarz-869.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@kira-schwarz', photoId: 6868419},
    ] as Array<PhotoCardType>,
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
    updateArrayPhotos: (photos: Array<PhotoCardType>) =>
        ({type: 'MAIN/UPDATE_ARRAY_PHOTOS', photos} as const),
    setRecommendCategories: (categories: Array<IHeaderContentItem>) =>
        ({type: 'MAIN/SET_RECOMMEND_CATEGORIES', categories} as const),
    setCuratedPageIndex: (page: number) =>
        ({type: 'MAIN/SET_CURATED_PAGE_INDEX', page} as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

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

// export const getPhoto = (query: string): ThunkType => async (dispatch) => {
//     const photoData = await photoAPI.getPhoto(query);
//     if (Boolean(photoData)) {
//         console.log(photoData)
//         // dispatch(actions.setAuthUserData(id, email, login, true))
//     }
// }

export const setHeaderPhoto = (): ThunkType => async (dispatch) => {
    const data = await photoAPI.getHeaderPhoto();
    let src;
    if (Boolean(data)) {
        // @ts-ignore
        const indexPhoto = getRandomInt(data?.photos.length);
        // @ts-ignore
        const photo = data?.photos[indexPhoto];
        const photographerUrl = photo?.photographer_url || initialState.headerPhoto.phLink;
        const photographer = photo?.photographer || initialState.headerPhoto.phNames;

        try {
            src = (photo.src.landscape !== undefined || photo.src.original !== undefined)
                ? (photo.src.landscape || photo.src.original)
                : initialState.headerPhoto.src;
        } catch (err) {
            console.log(err);
            console.log(data);

            src = initialState.headerPhoto.src;
        }

        dispatch(actions.setHeaderPhoto(photographerUrl, src, photographer));
    }
}


export const updateArrayPhotos = (page: number = 1): ThunkType => async (dispatch) => {
    const curatedPageIndex = initialState.curatedPageIndex;

    if (page !== curatedPageIndex) {
        const data = await photoAPI.getCuratedPhoto(page);

        if (Boolean(data)) {
            const photos = photoEditing(data);
            dispatch(actions.updateArrayPhotos(photos));
            dispatch(actions.setCuratedPageIndex(page));
        }
    }
}

export default homeReducer;
