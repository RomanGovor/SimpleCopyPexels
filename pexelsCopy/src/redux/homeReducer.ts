import {InferActionsTypes, BaseThunkType} from './store';
import {PhotoCardType} from '../types/commonTypes';
import img1 from '../assets/images/defaultImages/image-1.jpeg';
import img2 from '../assets/images/defaultImages/image-2.jpg';
import img3 from '../assets/images/defaultImages/image-3.jpg';
import defaultHeaderImage from '../assets/images/default-header-bg.jpeg';

import {photoAPI} from '../api/api';
import {getRandomInt} from "../utils/common";
import {isUniquePhoto, photoEditing} from "../utils/photoEditing";

type ThunkType = BaseThunkType<ActionsType>


const initialState = {
    photos: [
        {src: img1, phNames: 'kira schwarz', phPhotoLink: 'https://images.pexels.com/users/avatars/616468/kira-schwarz-869.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@kira-schwarz'},
        {src: img2, phNames: 'Jc Siller', phPhotoLink: 'https://images.pexels.com/users/avatars/30672065/jc-siller-412.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@jc-siller-30672065'},
        {src: img3, phNames: 'Vinícius Estevão', phPhotoLink: 'https://images.pexels.com/users/avatars/920335/vinicius-estevao-866.jpeg?auto=compress&fit=crop&h=60&w=60', phLink: 'https://www.pexels.com/@eosvini'},
    ] as Array<PhotoCardType>,
    maxCountOfColumns: 3,
    headerPhoto: {
        src: defaultHeaderImage,
        phNames: 'Nothing ahead',
        phLink: 'https://www.pexels.com/@kira-schwarz'
    } as PhotoCardType
};

export const actions = {
    addPostActionCreator: (phLink: string, phPhotoLink: string, src: string, phNames: string) =>
        ({type: 'ADD_PHOTO_CARD', phNames, phPhotoLink, phLink, src
    } as const),
    setHeaderPhoto: (phLink: string, src: string, phNames: string) =>
        ({type: 'UPDATE_HEADER_PHOTO', phNames, phLink, src} as const),
    updateArrayPhotos: (photos: Array<PhotoCardType>) =>
        ({type: 'UPDATE_ARRAY_PHOTOS', photos} as const)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const homeReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_PHOTO_CARD': {
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
        case 'UPDATE_HEADER_PHOTO': {
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
        case 'UPDATE_ARRAY_PHOTOS': {
            const isUnique = isUniquePhoto(state.photos[state.photos.length - 1], action.photos[action.photos.length - 1]);
            console.log(isUnique);
            if(isUnique) {
                return {
                    ...state,
                    photos: [...state.photos, ...action.photos],
                };
            }
            return state;
        }
        default:
            return state;
    }
}

export const getPhoto = (query: string): ThunkType => async (dispatch) => {
    const photoData = await photoAPI.getPhoto(query);
    if (Boolean(photoData)) {
        console.log(photoData)
        // dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const setHeaderPhoto = (): ThunkType => async (dispatch) => {
    const data = await photoAPI.getHeaderPhoto();
    if (Boolean(data)) {
        // @ts-ignore
        const indexPhoto = getRandomInt(data?.photos.length);
        // @ts-ignore
        const photo = data?.photos[indexPhoto];
        const photographer_url = photo.photographer_url || initialState.headerPhoto.phLink;
        const photographer = photo.photographer || initialState.headerPhoto.phNames;
        const src = photo.src.landscape || initialState.headerPhoto.src;

        dispatch(actions.setHeaderPhoto(photographer_url, src, photographer));
    }
}

let curatedPageIndex: number = 0

export const updateArrayPhotos = (page: number = 1): ThunkType => async (dispatch) => {
    if (page !== curatedPageIndex) {
        const data = await photoAPI.getCuratedPhoto(page);
        if (Boolean(data)) {
            const photos = photoEditing(data);
            dispatch(actions.updateArrayPhotos(photos));
            curatedPageIndex = page;
        }
    }
}

export default homeReducer;
