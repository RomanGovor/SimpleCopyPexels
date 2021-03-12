import {InferActionsTypes, BaseThunkType} from './store';
import {CollectArrayType, LikesArrayType, PhotoCardType, TrendingSearchesType} from "../types/commonTypes";
import {photoAPI, wordsAPI} from "../api/api";
import {getRandomArray} from "../utils/common";
import img1 from "../assets/images/defaultImages/image-1.jpeg";
import {VocabularyLangType} from "../types/langTypes";
import {VocabularyEn} from "../utils/languages/en";
import {VocabularyRu} from "../utils/languages/ru";
import {VocabularyBy} from "../utils/languages/by";
import {defaultPhotoParameters} from "../utils/constants/constants";


type ThunkType = BaseThunkType<ActionsType>

export const initialState = {
    likedPhotos: [] as Array<number>,
    collectPhotos: [] as Array<number>,
    suggestionWords: [] as Array<string>,
    resentSearches: [] as Array<string>,
    trendingSearches: [] as Array<TrendingSearchesType>,
    headerInputValue: '' as string,
    navInputValue: '' as string,
    photoModalCard: defaultPhotoParameters as PhotoCardType,
    isOpenModal: false,
    lang: 'en' as string,
    vocabulary: VocabularyEn as VocabularyLangType
};

export const actionsCommon = {
    setLikedPhotos: (likedPhotos: LikesArrayType) =>
        ({type: 'COMMON/SET_LIKED_PHOTOS', likedPhotos} as const),
    setCollectPhotos: (collectPhotos: CollectArrayType) =>
        ({type: 'COMMON/SET_COLLECT_PHOTOS', collectPhotos} as const),
    setTrendingCategories: (trendingCategories: Array<TrendingSearchesType>) =>
        ({type: 'COMMON/SET_TRENDING_CATEGORIES', trendingCategories} as const),
    setResentSearches: (resentSearches: Array<string>) =>
        ({type: 'COMMON/SET_RESENT_SEARCHES', resentSearches} as const),
    setHeaderInputValue: (value: string) =>
        ({type: 'COMMON/SET_HEADER_INPUT_VALUE', value} as const),
    setNavInputValue: (value: string) =>
        ({type: 'COMMON/SET_NAV_INPUT_VALUE', value} as const),
    setSuggestionWords: (suggestionWords: Array<string>) =>
        ({type: 'COMMON/SET_SUGGESTION_WORDS', suggestionWords} as const),
    setPhotoModalCard: (photoCard: PhotoCardType) =>
        ({type: 'COMMON/SET_PHOTO_MODAL_CARD', photoCard} as const),
    setOpenModalFlag: (isOpen: boolean) =>
        ({type: 'COMMON/SET_OPEN_MODAL_FLAG', isOpen} as const),
    setLanguage: (lang: string) =>
        ({type: 'COMMON/SET_LANGUAGE', lang} as const)
}


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsCommon>

const commonReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'COMMON/SET_LIKED_PHOTOS': {
            return {
                ...state,
                likedPhotos: [...action.likedPhotos]
            };
        }
        case 'COMMON/SET_COLLECT_PHOTOS': {
            return {
                ...state,
                collectPhotos: [...action.collectPhotos]
            };
        }
        case 'COMMON/SET_TRENDING_CATEGORIES': {
            return {
                ...state,
                trendingSearches: [...action.trendingCategories]
            }
        }
        case 'COMMON/SET_HEADER_INPUT_VALUE': {
            return {
                ...state,
                headerInputValue: action.value
            }
        }
        case 'COMMON/SET_NAV_INPUT_VALUE': {
            return {
                ...state,
                navInputValue: action.value
            }
        }
        case 'COMMON/SET_RESENT_SEARCHES': {
            return {
                ...state,
                resentSearches: [...action.resentSearches]
            }
        }
        case 'COMMON/SET_SUGGESTION_WORDS': {
            return {
                ...state,
                suggestionWords: [...action.suggestionWords]
            }
        }
        case 'COMMON/SET_PHOTO_MODAL_CARD': {
            return {
                ...state,
                photoModalCard: action.photoCard
            }
        }
        case 'COMMON/SET_OPEN_MODAL_FLAG': {
            return {
                ...state,
                isOpenModal: action.isOpen
            }
        }
        case 'COMMON/SET_LANGUAGE': {
            let vocabulary: VocabularyLangType;
            switch (action.lang) {
                case 'en':
                    vocabulary = VocabularyEn
                    break;
                case 'ru':
                    vocabulary = VocabularyRu
                    break
                case 'by':
                    vocabulary = VocabularyBy
                    break
                default:
                    vocabulary = VocabularyEn
            }

            console.log(vocabulary);

            return {
                ...state,
                lang: action.lang,
                vocabulary: vocabulary
            }
        }
        default:
            return state;
    }
}

export const setSuggestionWords = (value: string): ThunkType => async (dispatch) => {
    if (value.trim().length !== 0) {
        const data = await wordsAPI.getArrayWord(value);

        if (Boolean(data)) {
            const arr: Array<string> = data.data.results.data;
            const filterArr = arr.filter((el) => !el.includes(' '));
            const words = getRandomArray(filterArr.length, 10, filterArr);
            dispatch(actionsCommon.setSuggestionWords(words));
        }
    }
}


export default commonReducer;
