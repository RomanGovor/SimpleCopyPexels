import {InferActionsTypes, BaseThunkType} from './store';
import {LikesArrayType, TrendingSearchesType} from "../types/commonTypes";
import {photoAPI, wordsAPI} from "../api/api";
import {photoEditing} from "../utils/photoEditing";
import {actions} from "./homeReducer";
import {getRandomArray} from "../utils/common";


type ThunkType = BaseThunkType<ActionsType>

const initialState = {
    likedPhotos: [] as Array<number>,
    suggestionWords: [] as Array<string>,
    resentSearches: [] as Array<string>,
    trendingSearches: [] as Array<TrendingSearchesType>,
    headerInputValue: '' as string,
    navInputValue: '' as string
};

export const actionsCommon = {
    setLikedPhotos: (likedPhotos: LikesArrayType) =>
        ({type: 'COMMON/SET_LIKED_PHOTOS', likedPhotos} as const),
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
